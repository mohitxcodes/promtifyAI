import { motion } from 'framer-motion';
import Header from './../../../common/Header';
import Footer from './../../../common/Footer';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a13] via-[#181825] to-[#09090f] text-white flex flex-col font-sans">
            <Header />
            {/* Hero Section - Centered */}
            <section className="flex-1 flex flex-col items-center justify-center px-8 md:px-24 py-20 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-3xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
                        Professional AI Solutions<br />
                        <span className="text-indigo-400">for Modern Teams</span>
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        Get instant, reliable answers to your toughest questions. Secure, fast, and always available—powered by advanced AI.
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="#get-started"
                        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition"
                    >
                        Get Started
                    </motion.a>
                </motion.div>
                {/* Hero Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-12 flex justify-center"
                >
                    <div className="w-64 h-64 bg-gradient-to-br from-[#181825] to-[#232946] rounded-3xl flex items-center justify-center shadow-2xl border border-indigo-900">
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="50" fill="#0a0a13" stroke="#232946" strokeWidth="4" />
                            <ellipse cx="60" cy="80" rx="32" ry="16" fill="#fff" fillOpacity="0.06" />
                            <circle cx="45" cy="55" r="8" fill="#fff" fillOpacity="0.12" />
                            <circle cx="75" cy="55" r="8" fill="#fff" fillOpacity="0.12" />
                            <rect x="52" y="80" width="16" height="4" rx="2" fill="#fff" fillOpacity="0.12" />
                        </svg>
                    </div>
                </motion.div>
            </section>
            <FeaturesSection />
            <HowItWorksSection />
            <Footer />
        </div>
    );
}
