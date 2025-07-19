import { motion } from 'framer-motion';

const Header = () => (
    <header className="w-full px-8 py-6 flex items-center justify-between border-b border-gray-900 bg-black/80 sticky top-0 z-30">
        <div className="text-2xl font-bold tracking-tight">promptify<span className="text-indigo-400">AI</span></div>
        <nav className="hidden md:flex gap-8 text-gray-300 text-base">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how" className="hover:text-white transition">How it Works</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <motion.a
            whileHover={{ scale: 1.05 }}
            href="#get-started"
            className="ml-6 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-purple-700 transition hidden md:inline-block"
        >
            Get Started
        </motion.a>
    </header>
);

export default Header; 