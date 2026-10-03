<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

trait OptimizesImages
{
    /**
     * Converts a single image field to WebP format.
     */
    protected function optimizeImageToWebp(string $field, int $quality = 80): void
    {
        $path = $this->{$field};
        
        if (!$path) return;

        $ext = pathinfo($path, PATHINFO_EXTENSION);
        if (strtolower($ext) === 'webp') return;

        // Skip videos
        if (in_array(strtolower($ext), ['mp4', 'webm', 'ogg', 'mov', 'avi'])) return;

        $fullPath = storage_path('app/public/' . $path);
        
        if (file_exists($fullPath)) {
            try {
                $manager = new ImageManager(new Driver());
                $image = $manager->decode($fullPath);
                
                $newRelativePath = preg_replace('/\.[a-zA-Z0-9]+$/', '.webp', $path);
                $newPath = storage_path('app/public/' . $newRelativePath);
                
                $image->save($newPath, $quality);
                unlink($fullPath);
                
                $this->updateQuietly([$field => $newRelativePath]);
            } catch (\Exception $e) {
                \Log::error('Image optimization failed: ' . $e->getMessage());
            }
        }
    }

    /**
     * Converts an array/JSON media field to WebP (skips videos).
     */
    protected function optimizeMediaArrayToWebp(string $field, int $quality = 80): void
    {
        $items = $this->{$field};
        
        if (!is_array($items) || empty($items)) return;

        $updated = false;
        $newItems = [];

        foreach ($items as $path) {
            $ext = pathinfo($path, PATHINFO_EXTENSION);

            // Skip videos and already-webp
            if (in_array(strtolower($ext), ['mp4', 'webm', 'ogg', 'mov', 'avi', 'webp'])) {
                $newItems[] = $path;
                continue;
            }

            $fullPath = storage_path('app/public/' . $path);

            if (file_exists($fullPath)) {
                try {
                    $manager = new ImageManager(new Driver());
                    $image = $manager->decode($fullPath);

                    $newRelativePath = preg_replace('/\.[a-zA-Z0-9]+$/', '.webp', $path);
                    $newPath = storage_path('app/public/' . $newRelativePath);

                    $image->save($newPath, $quality);
                    unlink($fullPath);

                    $newItems[] = $newRelativePath;
                    $updated = true;
                } catch (\Exception $e) {
                    \Log::error('Media optimization failed: ' . $e->getMessage());
                    $newItems[] = $path;
                }
            } else {
                $newItems[] = $path;
            }
        }

        if ($updated) {
            $this->updateQuietly([$field => $newItems]);
        }
    }
}
