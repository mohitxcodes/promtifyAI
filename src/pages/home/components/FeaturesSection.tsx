import { motion } from 'framer-motion';

const FeaturesSection = () => (
    <section id="features" className="px-8 md:px-24 py-20 border-b border-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
                whileHover={{ y: -8, boxShadow: '0 8px 32px #222' }}
                className="bg-white/5 border border-indigo-900 rounded-2xl p-8 flex flex-col items-center shadow-lg transition"
            >
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="mb-4"><rect x="4" y="4" width="28" height="28" rx="8" fill="#fff" fillOpacity="0.04" /><path d="M18 10v8l6 3" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" /></svg>
                <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered Answers</h3>
                <p className="text-gray-200 text-center">Get instant, accurate responses to any question, powered by advanced AI.</p>
            </motion.div>
            <motion.div
                whileHover={{ y: -8, boxShadow: '0 8px 32px #222' }}
                className="bg-white/5 border border-indigo-900 rounded-2xl p-8 flex flex-col items-center shadow-lg transition"
            >
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="mb-4"><rect x="4" y="4" width="28" height="28" rx="8" fill="#fff" fillOpacity="0.04" /><path d="M10 18h16" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" /><path d="M18 10v16" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" /></svg>
                <h3 className="text-xl font-semibold mb-2 text-white">Fast & Reliable</h3>
                <p className="text-gray-200 text-center">Lightning-fast answers, 24/7, with high reliability and uptime.</p>
            </motion.div>
            <motion.div
                whileHover={{ y: -8, boxShadow: '0 8px 32px #222' }}
                className="bg-white/5 border border-indigo-900 rounded-2xl p-8 flex flex-col items-center shadow-lg transition"
            >
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="mb-4"><rect x="4" y="4" width="28" height="28" rx="8" fill="#fff" fillOpacity="0.04" /><rect x="12" y="16" width="12" height="8" rx="2" stroke="#a5b4fc" strokeWidth="2.5" /><circle cx="18" cy="20" r="2" fill="#a5b4fc" /></svg>
                <h3 className="text-xl font-semibold mb-2 text-white">Secure & Private</h3>
                <p className="text-gray-200 text-center">Your questions and data are always safe and confidential.</p>
            </motion.div>
        </div>
    </section>
);

export default FeaturesSection; 