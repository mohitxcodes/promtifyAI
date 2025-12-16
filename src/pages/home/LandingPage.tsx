import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaReact, FaRobot } from 'react-icons/fa';
import { SiTailwindcss, SiFirebase, } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';

const taglines = [
    'Ask Anything. Get Answers.',
    'Powered by OpenAI API.',
    'Instant, Reliable AI Help.',
    'Solve Problems, Learn Fast.'
];

function useTypewriter(words: string[], speed = 80, pause = 1200) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [blink, setBlink] = useState(true);
    useEffect(() => {
        if (subIndex === words[index].length + 1 && !deleting) {
            setTimeout(() => setDeleting(true), pause);
            return;
        }
        if (subIndex === 0 && deleting) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (deleting ? -1 : 1));
        }, deleting ? speed / 2 : speed);
        return () => clearTimeout(timeout);
    }, [subIndex, index, deleting, words, speed, pause]);
    useEffect(() => {
        const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
        return () => clearInterval(blinkInterval);
    }, []);
    return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
}

const exampleQuestions = [
    'How do I center a div in CSS?',
    'What is the capital of France?',
    'Explain quantum computing in simple terms.',
    'How can I improve my productivity?',
    'What are the latest trends in AI?'
];

export default function LandingPage() {
    const typewriter = useTypewriter(taglines, 60, 1200);
    const aiIconControls = useAnimation();
    // Parallax effect for background pattern
    const patternRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (patternRef.current) {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                patternRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    useEffect(() => {
        aiIconControls.start({ y: [0, -10, 0] }, { duration: 2, repeat: Infinity, ease: 'easeInOut' });
    }, [aiIconControls]);

    return (
        <div className="min-h-screen text-white flex flex-col font-sans">
            {/* Hero Section - Centered with Texture and Interactivity */}
            <section className="relative flex-1 flex flex-col items-center justify-center px-8 md:px-24 py-24 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a13 60%, #181825 100%)' }}>

                {/* SVG Texture/Pattern with Parallax */}
                <div ref={patternRef} className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300" style={{ zIndex: 0 }}>
                    <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#23232a" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                {/* Subtle noise overlay */}
                <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'url(https://www.transparenttextures.com/patterns/asfalt-light.png)', opacity: 0.12, zIndex: 1 }} />
                {/* Floating AI Icon */}
                <motion.div animate={aiIconControls} className="absolute left-8 top-8 z-20 hidden md:block">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-full p-4 shadow-2xl border border-gray-700">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="20" fill="#181825" stroke="#444" strokeWidth="2" />
                            <ellipse cx="24" cy="30" rx="10" ry="6" fill="#fff" fillOpacity="0.06" />
                            <circle cx="18" cy="22" r="3" fill="#fff" fillOpacity="0.15" />
                            <circle cx="30" cy="22" r="3" fill="#fff" fillOpacity="0.15" />
                            <rect x="20" y="30" width="8" height="2" rx="1" fill="#fff" fillOpacity="0.15" />
                        </svg>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-3xl mx-auto relative z-10"
                >
                    {/* Typewriter Tagline */}
                    <div className="h-6 flex items-center justify-center mb-3">
                        <span className="text-xs md:text-sm font-mono text-gray-300 bg-gray-900/60 px-6 py-0.5 rounded-full border border-gray-700 shadow-inner inline-block min-w-[100px]">{typewriter}</span>
                    </div>
                    <h1 className="text-5xl md:text-5xl font-extrabold mb-6 leading-tight text-white drop-shadow-xl tracking-tight">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">PromptifyAI: Your AI Q&A Copilot</span>
                        <span className="block  text-base md:text-lg font-normal mt-4 text-gray-400 tracking-wide">
                            Instantly get answers, explanations, and insights from advanced AI.<br />
                            No signup, no hassle—just ask and explore.
                        </span>
                    </h1>
                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">
                        <Link
                            to="/get-started"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-gray-900 font-bold shadow-xl shadow-white/10 hover:shadow-white/20 hover:-translate-y-1 text-lg border border-white/50"
                        >
                            <GoArrowRight className='text-gray-900 text-xl group-hover:rotate-12 transition-transform duration-300' />
                            <span>Try PromptifyAI</span>
                            {/* Inner glow */}
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 group-hover:ring-black/10 transition-all" />
                        </Link>
                    </div>
                    {/* Example Questions & Error Handling Note */}
                    <div className="flex flex-col items-center gap-4 mt-8">
                        <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Try asking things like:</span>
                        <div className="flex flex-wrap justify-center gap-3 mb-2">
                            {exampleQuestions.map((q, i) => (
                                <span key={i} className="px-4 py-1 rounded-full bg-gray-900/80 border border-gray-700 text-gray-300 text-xs font-mono shadow cursor-pointer select-none">{q}</span>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 mt-2">Handles errors gracefully &mdash; get clear feedback if something goes wrong.</span>
                        {/* Tech Stack Label and Row */}
                        <div className="flex flex-col items-center mt-8 opacity-50">
                            <span className="text-base font-semibold text-gray-300 mb-3 ">Tech Stacks</span>
                            <div className="flex flex-wrap items-center justify-center gap-10 text-2xl  font-bold text-gray-200">
                                <span className="flex items-center gap-3"><FaReact className="text-gray-200 text-3xl" /> ReactJS</span>
                                <span className="flex items-center gap-3"><FaRobot className="text-gray-200 text-3xl" /> Grok API</span>
                                <span className="flex items-center gap-3"><SiTailwindcss className="text-gray-200 text-3xl" /> Tailwind CSS</span>
                                <span className="flex items-center gap-3"><SiFirebase className="text-gray-200 text-3xl" /> Firebase</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
            {/* <FeaturesSection /> */}
            {/* <HowItWorksSection /> */}
            {/* <Footer /> */}
        </div>
    );
}
