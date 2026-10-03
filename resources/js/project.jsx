import { motion } from "framer-motion";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

export default function ProjectApp({ project: initialProject, onBack }) {
    const project = initialProject || window.projectData || {};
    const [lang, setLang] = useState('en');
    const media = Array.isArray(project.media) ? project.media : (project.media ? [project.media] : []);
    const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : (project.tech_stack ? project.tech_stack.split(',') : []);

    const isVideo = (path) => {
        return path.match(/\.(mp4|webm|ogg)$/i);
    };

    const handleBack = (e) => {
        if (onBack) {
            e.preventDefault();
            onBack();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans selection:bg-white selection:text-black">
            {/* Nav / Lang toggle */}
            <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
                <a href="/" onClick={handleBack} className="text-sm font-medium tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                    {lang === 'en' ? 'Back' : 'Kembali'}
                </a>
                <button 
                    onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
                    className="text-xs tracking-[0.2em] font-medium uppercase hover:text-white transition-colors"
                >
                    {lang === 'en' ? 'ID' : 'EN'}
                </button>
            </nav>

            {/* Hero / Cover */}
            <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight mb-8"
                >
                    {lang === 'en' ? (project.title_en || project.title) : (project.title_id || project.title)}
                </motion.h1>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-12"
                >
                    {project.year && (
                        <span className="px-4 py-1.5 text-xs font-medium uppercase tracking-widest border border-white/20 text-white rounded-full bg-white/10">
                            {project.year}
                        </span>
                    )}
                    {techStack.map((tech, idx) => (
                        <span key={idx} className="px-4 py-1.5 text-xs font-medium uppercase tracking-widest border border-white/10 text-neutral-400 rounded-full bg-white/5">
                            {tech.trim()}
                        </span>
                    ))}
                </motion.div>

                {media.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-full flex justify-center bg-[#111] rounded-2xl overflow-hidden border border-white/5"
                    >
                        {isVideo(media[0]) ? (
                            <video src={`/storage/${media[0]}`} autoPlay loop muted playsInline controls className="w-full max-h-[85vh] object-contain" />
                        ) : (
                            <img src={`/storage/${media[0]}`} alt={project.title} className="w-full max-h-[85vh] object-contain" />
                        )}
                    </motion.div>
                )}
            </header>

            {/* Content & Gallery */}
            <main className="px-6 max-w-7xl mx-auto pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Story / Description */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-6 font-medium">{lang === 'en' ? 'The Story' : 'Cerita'}</h3>
                            <div 
                                className="text-base md:text-lg text-neutral-400 leading-relaxed font-light mb-10 [&>p]:mb-4 [&>strong]:text-white [&>strong]:font-semibold"
                                dangerouslySetInnerHTML={{ __html: lang === 'en' ? project.description_en : project.description_id }}
                            />
                            {project.link_url && (
                                <a href={project.link_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors">
                                    {lang === 'en' ? 'Visit Project' : 'Kunjungi Proyek'}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Additional Media Gallery */}
                    <div className="lg:col-span-8 flex flex-col gap-12">
                        {media.slice(1).map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full flex justify-center rounded-2xl overflow-hidden border border-white/5 bg-[#111]"
                            >
                                {isVideo(item) ? (
                                    <video src={`/storage/${item}`} autoPlay loop muted playsInline controls className="w-full max-h-[85vh] object-contain" />
                                ) : (
                                    <img src={`/storage/${item}`} alt={`${project.title} - ${idx}`} loading="lazy" className="w-full max-h-[85vh] object-contain" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

const rootElement = document.getElementById("project-app");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<ProjectApp />);
}
