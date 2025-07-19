const Footer = () => (
    <footer id="contact" className="w-full px-8 py-8 bg-black/90 text-gray-500 text-center text-sm border-t border-gray-900 mt-auto">
        <div className="mb-2">&copy; {new Date().getFullYear()} promptifyAI. All rights reserved.</div>
        <div className="flex justify-center gap-6 mt-2">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how" className="hover:text-white transition">How it Works</a>
            <a href="mailto:contact@promptifyai.com" className="hover:text-white transition">Contact</a>
        </div>
    </footer>
);

export default Footer; 