import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ProjectApp from "./project";
import "../css/app.css";

const greetings = [
    "Welcome",
    "Selamat Datang",
    "Bienvenue",
    "Willkommen",
    "Benvenuto",
    "ようこそ",
    "환영합니다",
    "مرحباً"
];

// Social SVGs
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

function App() {
    const { experiences = [], skills = [], projects = [], certifications = [], settings = {}, hero = null, about = null } = window.initialData || {};

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {});

    const [greetingIndex, setGreetingIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState('en');
    const [activeProjectSlide, setActiveProjectSlide] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);

    // Audio Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle Browser Back Button for Seamless Modal
    useEffect(() => {
        const handlePopState = () => {
            if (window.location.pathname === '/') {
                setSelectedProject(null);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const greetingsArr = hero?.greetings || (settings.hero_greetings ? JSON.parse(settings.hero_greetings) : [
        "Welcome",
        "Selamat Datang",
        "Bienvenue",
        "Willkommen",
        "Benvenuto",
        "ようこそ",
        "환영합니다",
        "مرحباً"
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingIndex((prev) => (prev + 1) % greetingsArr.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [greetingsArr.length]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-neutral-800 font-['Inter']">

            {/* Navbar (Sticky & Blur on Scroll) */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4' : 'py-8'}`}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div className="text-base font-['Oswald'] tracking-widest uppercase text-neutral-300">
                        {settings.hero_name || 'Surya Pratama'} <span className="font-['Playfair_Display'] italic ml-2 text-sm lowercase hidden sm:inline text-neutral-500">/ refugium</span>
                    </div>

                    <div className="flex items-center gap-10">
                        <ul className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-['Oswald'] text-neutral-500">
                            <li><a href="#about" className="hover:text-white transition-colors">{lang === 'en' ? 'About' : 'Tentang'}</a></li>
                            <li><a href="#work" className="hover:text-white transition-colors">{lang === 'en' ? 'Work' : 'Karya'}</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">{lang === 'en' ? 'Contact' : 'Kontak'}</a></li>
                        </ul>

                        <div className="hidden sm:flex items-center gap-6">
                            {/* Language Toggle */}
                            <div className="flex gap-3 text-xs font-['Oswald'] tracking-widest">
                                <button
                                    onClick={() => setLang('en')}
                                    className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
                                >
                                    EN
                                </button>
                                <span className="text-neutral-700">|</span>
                                <button
                                    onClick={() => setLang('id')}
                                    className={`transition-colors ${lang === 'id' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'}`}
                                >
                                    ID
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
                            className="md:hidden text-xs font-['Oswald'] tracking-widest text-neutral-400 hover:text-white transition-colors p-2"
                        >
                            {lang === 'en' ? 'ID' : 'EN'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main id="home" className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">

                {/* Background Images & Animated Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/setup_bg_mobile.jpg"
                        alt="Mobile Background"
                        className="w-full h-full object-cover md:hidden opacity-40"
                    />
                    <img
                        src="/images/setup_bg_desktop.jpg"
                        alt="Desktop Background"
                        className="w-full h-full object-cover hidden md:block opacity-40"
                    />

                    {/* Animated Monochromatic Background Overlay */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.03) 0%, rgba(5,5,5,0.9) 50%)",
                                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.08) 0%, rgba(5,5,5,0.95) 60%)",
                                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(5,5,5,0.85) 70%)",
                                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.03) 0%, rgba(5,5,5,0.9) 50%)"
                            ]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="relative z-10 w-full max-w-[1200px] mx-auto mt-20">
                    {/* Teks Sambutan Bergantian (Multilingual) */}
                    <div className="h-12 mb-8 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={greetingIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="text-2xl md:text-4xl font-['Playfair_Display'] italic tracking-wide drop-shadow-md text-neutral-300"
                            >
                                {greetingsArr[greetingIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Highlight Nama / Brand */}
                    <h1 className="text-6xl sm:text-7xl md:text-[7rem] lg:text-[9rem] font-['Oswald'] font-bold tracking-tighter leading-[0.9] drop-shadow-2xl mb-12 uppercase text-white">
                        {hero?.name || settings.hero_name || 'SURYA PRATAMA'}
                    </h1>

                    {/* Penjelasan Refugium */}
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] italic drop-shadow-lg text-neutral-200">
                            {hero?.subtitle || settings.hero_subtitle_en || 'Refugium'}
                        </h2>
                        <p className="text-sm md:text-base font-light max-w-md mx-auto mt-4 leading-relaxed text-neutral-400">
                            {lang === 'en' 
                                ? (hero?.description || settings.hero_definition_en || '/rɪˈfjuːdʒɪəm/ — A Latin word meaning a place of refuge, shelter, or safe haven.')
                                : (settings.hero_definition_id || '/rɪˈfjuːdʒɪəm/ — Kata Latin yang berarti tempat perlindungan, naungan, atau tempat yang aman.')
                            }
                        </p>
                    </div>
                </div>
            </main>

            {/* About Section */}
            <section id="about" className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto relative z-10 bg-[#050505]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Profile Image */}
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-2 group-hover:translate-y-2 bg-neutral-800"></div>
                        <img
                            src={about?.profile_image ? `/storage/${about.profile_image}` : "/images/profile_portrait.jpg"}
                            alt="Surya Pratama Portrait"
                            className="relative z-10 w-full h-auto aspect-square object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 rounded-sm"
                        />
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:col-span-7 lg:pl-10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-500">
                                {lang === 'en' ? '01. About Me' : '01. Tentang Saya'}
                            </h2>
                        </div>

                        {lang === 'en' ? (
                            <motion.div
                                key="en"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl md:text-4xl font-light leading-snug mb-8 text-neutral-300">
                                    {about?.heading_en || 'I am a digital builder exploring the intersection of design, code, and seamless user experiences.'}
                                </h3>
                                <div 
                                    className="text-base md:text-lg leading-relaxed text-neutral-400 [&>p]:mb-4 [&>strong]:text-white [&>strong]:font-semibold"
                                    dangerouslySetInnerHTML={{ __html: about?.description_en || '"Refugium" represents my philosophy...' }}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="id"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl md:text-4xl font-light leading-snug mb-8 text-neutral-300">
                                    {about?.heading_id || 'Saya adalah seorang digital builder yang mengeksplorasi titik temu antara desain, kode, dan pengalaman pengguna.'}
                                </h3>
                                <div 
                                    className="text-base md:text-lg leading-relaxed text-neutral-400 [&>p]:mb-4 [&>strong]:text-white [&>strong]:font-semibold"
                                    dangerouslySetInnerHTML={{ __html: about?.description_id || '"Refugium" mewakili filosofi saya...' }}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Creative / Story Section (Video Background) */}
            <section id="story" className="relative py-40 px-6 md:px-12 flex items-center justify-center overflow-hidden border-y border-neutral-900">
                {/* Video Background */}
                <div className="absolute inset-0 z-0 bg-[#050505]">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-30 filter grayscale"
                    >
                        <source src="/videos/abstract_dark.mp4" type="video/mp4" />
                    </video>
                    {/* Gradient overlay to ensure text readability but keep video visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="relative z-10 max-w-[1200px] w-full mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-xs uppercase tracking-[0.4em] font-medium text-neutral-500 mb-6">
                            {lang === 'en' ? '02. The Journey' : '02. Perjalanan Kreatif'}
                        </h2>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-xl">
                            {lang === 'en'
                                ? (settings.about_title_en || 'Developer. Creative. Dreamer.')
                                : (settings.about_title_id || 'Pengembang. Kreatif. Pemimpi.')}
                        </h3>

                        {lang === 'en' ? (
                            <motion.div
                                key="en_story"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light">
                                    {settings.about_desc_en || 'Beyond just writing code, I believe in building experiences that leave a mark.'}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="id_story"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light">
                                    {settings.about_desc_id || 'Lebih dari sekadar menulis kode, saya percaya pada penciptaan pengalaman yang membekas.'}
                                </p>
                            </motion.div>
                        )}

                        <div className="mt-12">
                            <a href="#experience" className="inline-block border border-neutral-700 px-8 py-3 text-xs uppercase tracking-widest text-neutral-300 hover:bg-white hover:text-black transition-all duration-300">
                                {lang === 'en' ? 'View My Experience' : 'Lihat Pengalaman Saya'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience & Skills Section */}
            <section id="experience" className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto">
                <div className="mb-20">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium mb-4">
                        {lang === 'en' ? '03. Experience & Skills' : '03. Pengalaman & Keahlian'}
                    </h2>
                    <p className="text-2xl font-light text-neutral-400">
                        {lang === 'en' ? 'My professional journey and technical arsenal.' : 'Perjalanan karier dan persenjataan teknis saya.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Experience List */}
                    <div>
                        <h3 className="text-xl font-semibold tracking-tight text-neutral-300 mb-8 border-b border-white/10 pb-4">
                            {lang === 'en' ? 'Experience' : 'Pengalaman'}
                        </h3>
                        <div className="space-y-12">
                            {experiences.map((exp, index) => (
                                <div key={exp.id} className="relative pl-8 md:pl-10 border-l border-neutral-800">
                                    <div className="absolute w-3 h-3 bg-neutral-600 rounded-full -left-[6.5px] top-1.5"></div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
                                        {exp.logo_path && (
                                            <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white rounded-xl p-1.5 md:p-2 shadow-lg flex items-center justify-center border border-neutral-200">
                                                <img src={`/storage/${exp.logo_path}`} alt={exp.company} className="max-w-full max-h-full object-contain" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-lg md:text-xl font-semibold text-neutral-100 tracking-tight">{lang === 'en' ? (exp.title_en || exp.title) : (exp.title_id || exp.title)}</h4>
                                            <p className="text-sm text-neutral-500 mb-3">{lang === 'en' ? (exp.company_en || exp.company) : (exp.company_id || exp.company)} • {lang === 'en' ? (exp.duration_en || exp.duration) : (exp.duration_id || exp.duration)}</p>
                                            <p className="text-sm font-light text-neutral-400 leading-relaxed whitespace-pre-wrap break-words">
                                                {lang === 'en' ? exp.description_en : exp.description_id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className="text-xl font-semibold tracking-tight text-neutral-300 mb-8 border-b border-white/10 pb-4">
                            {lang === 'en' ? 'Technical Skills' : 'Keahlian Teknis'}
                        </h3>

                        <div className="space-y-6">
                            {Object.entries(skillsByCategory).map(([category, items]) => (
                                <div key={category}>
                                    <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map(skill => (
                                            <span key={skill} className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 rounded-sm">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section id="work" className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-white/5">
                <div className="mb-20">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium mb-4">
                        {lang === 'en' ? '04. Selected Work' : '04. Karya Pilihan'}
                    </h2>
                    <p className="text-2xl font-light text-neutral-400">
                        {lang === 'en' ? 'Featured projects & experiments' : 'Proyek & eksperimen unggulan'}
                    </p>
                </div>

                <div className="relative w-full">
                    <div 
                        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onScroll={(e) => {
                            const scrollLeft = e.target.scrollLeft;
                            const itemWidth = e.target.children[0].offsetWidth + 24; // width + gap
                            const newActive = Math.round(scrollLeft / itemWidth);
                            setActiveProjectSlide(newActive);
                        }}
                    >
                        {/* CSS to hide scrollbar for webkit browsers */}
                        <style>{`
                            .flex.overflow-x-auto::-webkit-scrollbar { display: none; }
                        `}</style>
                        
                        {projects.map((project, idx) => (
                            <a 
                                href={`/project/${project.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedProject(project);
                                    window.history.pushState(null, '', `/project/${project.slug}`);
                                }}
                                key={project.id} 
                                className="group relative flex flex-col bg-[#0a0a0a] overflow-hidden cursor-pointer rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 flex-none w-[90%] md:w-[48%] snap-center md:snap-start hover:-translate-y-1"
                            >
                                {/* Project image or placeholder */}
                                <div className="relative w-full aspect-[16/10] bg-[#0a0a0a] overflow-hidden border-b border-white/5 flex items-center justify-center">
                                    {project.media && project.media.length > 0 ? (
                                        project.media[0].match(/\.(mp4|webm|ogg)$/i) ? (
                                            <video src={`/storage/${project.media[0]}`} autoPlay loop muted playsInline className="w-full h-full object-contain p-4 block opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-transform duration-700" />
                                        ) : (
                                            <img src={`/storage/${project.media[0]}`} alt={project.title} loading="lazy" className="w-full h-full object-contain p-4 block opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-transform duration-700" />
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-700 font-medium tracking-widest text-xs uppercase">No Media</div>
                                    )}
                                </div>

                                <div className="p-6 md:p-8 flex flex-col z-20 bg-gradient-to-b from-[#0a0a0a] to-[#050505] grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-1.5">
                                            {project.year && (
                                                <span className="text-neutral-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                    {project.year}
                                                </span>
                                            )}
                                            <p className="text-neutral-500 text-[9px] uppercase tracking-[0.2em] font-semibold line-clamp-1">
                                                {Array.isArray(project.tech_stack) ? project.tech_stack.join(' • ') : (typeof project.tech_stack === 'string' ? project.tech_stack : '')}
                                            </p>
                                        </div>
                                        <span className="text-neutral-600 group-hover:text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 ml-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                                        </span>
                                    </div>
                                    <h4 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-200 mb-3 group-hover:text-white transition-colors">
                                        {lang === 'en' ? (project.title_en || project.title) : (project.title_id || project.title)}
                                    </h4>
                                    <div 
                                        className="text-sm font-light text-neutral-400 line-clamp-2 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: lang === 'en' ? project.description_en : project.description_id }}
                                    />
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    {projects.length > 1 && (
                        <div className="flex justify-center gap-2 mt-2">
                            {projects.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`h-1.5 rounded-full transition-all duration-500 ${activeProjectSlide === idx ? 'w-8 bg-white' : 'w-2 bg-neutral-700'}`} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Certifications Section */}
            {certifications.length > 0 && (
                <section id="certifications" className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-white/5">
                    <div className="mb-20">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium mb-4">
                            {lang === 'en' ? '05. Certifications' : '05. Sertifikasi'}
                        </h2>
                        <p className="text-2xl font-light text-neutral-400">
                            {lang === 'en' ? 'Continuous learning and recognitions.' : 'Pembelajaran berkelanjutan dan pencapaian.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="group relative flex flex-col bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300">
                                {cert.media && cert.media.length > 0 && (
                                    <div className="w-full aspect-[4/3] bg-[#111] overflow-hidden flex items-center justify-center p-4">
                                        <img src={`/storage/${cert.media[0]}`} alt={cert.title} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                )}
                                <div className="p-6 md:p-8 flex flex-col grow bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col gap-1.5">
                                            {cert.date && (
                                                <span className="text-neutral-300 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                    {cert.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-2">{cert.title}</h3>
                                    <p className="text-sm font-light text-neutral-400">{cert.issuer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto text-center border-t border-white/5">
                <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium mb-8">
                    {lang === 'en' ? "04. What's Next?" : "04. Selanjutnya?"}
                </h2>
                <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-8 text-neutral-200">
                    {lang === 'en' ? 'Get in touch' : 'Hubungi Saya'}
                </h3>
                <p className="text-neutral-500 text-base md:text-lg max-w-lg mx-auto mb-12 font-light">
                    {lang === 'en'
                        ? "Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's build something great together."
                        : "Apakah Anda memiliki pertanyaan, ide proyek, atau hanya ingin menyapa, kotak masuk saya selalu terbuka. Mari kita bangun sesuatu yang hebat bersama."}
                </p>

                <a href={`mailto:${settings.contact_email || 'hello@suryapratama.com'}`} className="inline-block bg-transparent border border-neutral-700 text-neutral-300 px-8 py-3 text-sm rounded-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 mb-20">
                    {lang === 'en' ? 'Say Hello' : 'Sapa Saya'}
                </a>

                <div className="flex gap-6 justify-center">
                    <a href={settings.contact_github || '#'} target="_blank" rel="noreferrer" className="p-3 rounded-full text-neutral-500 hover:text-white transition-colors">
                        <GithubIcon />
                    </a>
                    <a href={settings.contact_linkedin || '#'} target="_blank" rel="noreferrer" className="p-3 rounded-full text-neutral-500 hover:text-white transition-colors">
                        <LinkedinIcon />
                    </a>
                    <a href={`mailto:${settings.contact_email || 'hello@suryapratama.com'}`} className="p-3 rounded-full text-neutral-500 hover:text-white transition-colors">
                        <MailIcon />
                    </a>
                </div>
            </section>

            {/* Vinyl Audio Player */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="fixed bottom-8 left-8 z-50 flex items-center gap-4 bg-black/30 backdrop-blur-xl p-3 pr-8 rounded-full border border-white/5 shadow-2xl hover:bg-black/50 hover:border-white/10 transition-all duration-300 group cursor-pointer"
                onClick={togglePlay}
            >
                {/* Vinyl Record */}
                <div className="relative w-12 h-12 flex-shrink-0">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#111] via-[#222] to-[#111] flex items-center justify-center shadow-lg shadow-black/50 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                        {/* Grooves */}
                        <div className="absolute inset-[3px] rounded-full border border-white/5"></div>
                        <div className="absolute inset-[7px] rounded-full border border-white/5"></div>

                        {/* Center Label (Album Art Vibe) */}
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-800 to-neutral-900 border border-black/50 flex items-center justify-center overflow-hidden">
                            <div className="w-1.5 h-1.5 bg-black rounded-full shadow-inner"></div>
                        </div>
                    </div>
                    {/* Stylus / Tonearm accent (static) */}
                    <div className="absolute -top-1 -right-1 w-2 h-4 border-r-2 border-t-2 border-neutral-500 rounded-tr-md opacity-50 origin-top-right transform rotate-12"></div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-medium">
                            {isPlaying ? (lang === 'en' ? 'Now Playing' : 'Sedang Diputar') : (lang === 'en' ? 'Paused' : 'Dijeda')}
                        </span>
                        {/* Tiny equalizer bars when playing */}
                        {isPlaying && (
                            <div className="flex items-end gap-[2px] h-2">
                                <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-[2px] bg-white rounded-t-sm"></motion.div>
                                <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-[2px] bg-white rounded-t-sm"></motion.div>
                                <motion.div animate={{ height: ["50%", "100%", "50%"] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }} className="w-[2px] bg-white rounded-t-sm"></motion.div>
                            </div>
                        )}
                    </div>
                    <span className="text-sm text-neutral-200 font-medium tracking-wide group-hover:text-white transition-colors drop-shadow-md">
                        {settings.audio_title || 'The Weeknd - Call Out My Name'}
                    </span>
                </div>
                {/* 30-second preview from iTunes API */}
                <audio ref={audioRef} src={settings.audio_url || 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d5/0a/ca/d50aca46-f871-b774-077a-22cbb42df336/mzaf_7520446500958405524.plus.aac.p.m4a'} loop />
            </motion.div>

            {/* Footer */}
            <footer className="py-8 text-center border-t border-white/5 text-sm text-neutral-600 relative z-10">
                <p>{lang === 'en' ? 'Designed & Built by Surya Pratama' : 'Dirancang & Dibangun oleh Surya Pratama'} © {new Date().getFullYear()}</p>
            </footer>

            {/* Seamless Project Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-black overflow-y-auto"
                    >
                        <ProjectApp 
                            project={selectedProject} 
                            onBack={() => {
                                setSelectedProject(null);
                                window.history.pushState(null, '', '/');
                            }} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

createRoot(document.getElementById("app")).render(<App />);
