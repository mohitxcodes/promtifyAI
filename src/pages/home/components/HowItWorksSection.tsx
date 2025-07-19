const HowItWorksSection = () => (
    <section id="how" className="px-8 md:px-24 py-20 border-b border-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative">
            {/* Stepper Line */}
            <div className="hidden md:block absolute left-1/2 top-16 w-2/3 h-0.5 bg-gradient-to-r from-indigo-700 via-purple-900 to-indigo-900 z-0" style={{ transform: 'translateX(-50%)' }}></div>
            {/* Steps */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center relative">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-800 to-purple-900 border-4 border-indigo-900 text-2xl font-bold mb-4 z-10 shadow-lg">1</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Ask Your Question</h4>
                    <p className="text-gray-200 text-center max-w-xs">Type your query or prompt in the chat box.</p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center relative">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-800 to-purple-900 border-4 border-indigo-900 text-2xl font-bold mb-4 z-10 shadow-lg">2</div>
                    <h4 className="text-lg font-semibold text-white mb-1">AI Analyzes</h4>
                    <p className="text-gray-200 text-center max-w-xs">Our AI processes your input and generates a tailored response.</p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center relative">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-800 to-purple-900 border-4 border-indigo-900 text-2xl font-bold mb-4 z-10 shadow-lg">3</div>
                    <h4 className="text-lg font-semibold text-white mb-1">Get Your Solution</h4>
                    <p className="text-gray-200 text-center max-w-xs">Receive your answer instantly and continue the conversation.</p>
                </div>
            </div>
        </div>
    </section>
);

export default HowItWorksSection; 