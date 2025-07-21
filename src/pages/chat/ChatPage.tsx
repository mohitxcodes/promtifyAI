import { useRef, useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const initialMessages: Message[] = [
    { role: 'ai', content: 'Hi! I am PromptifyAI. How can I help you today?' },
];

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((msgs) => [
            ...msgs,
            { role: 'user', content: input },
            // Placeholder AI response
            { role: 'ai', content: "I'm an AI! Here's a sample response to your prompt." },
        ]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a13] via-[#181825] to-[#09090f] text-white font-sans">
            {/* Header */}
            <header className="w-full px-6 py-4 border-b border-gray-900 bg-black/80 flex items-center justify-between sticky top-0 z-20 shadow-md">
                <span className="text-xl font-bold tracking-tight text-white">PromptifyAI <span className="text-indigo-400">Chat</span></span>
                <span className="text-xs text-gray-400">Powered by OpenAI</span>
            </header>
            {/* Chat Area */}
            <div ref={chatRef} className="flex-1 overflow-y-auto px-2 md:px-0 py-8 max-w-2xl mx-auto w-full">
                <div className="flex flex-col gap-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-md text-base whitespace-pre-line
                  ${msg.role === 'user'
                                        ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 border border-gray-700'
                                        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white border border-indigo-900'}
                `}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Input Bar */}
            <form
                className="w-full max-w-2xl mx-auto px-2 md:px-0 py-6 flex items-center gap-3 bg-transparent sticky bottom-0"
                onSubmit={e => {
                    e.preventDefault();
                    sendMessage();
                }}
                style={{ backdropFilter: 'blur(6px)' }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 px-5 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-base shadow"
                />
                <button
                    type="submit"
                    className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!input.trim()}
                >
                    <FiSend className="text-xl" />
                </button>
            </form>
        </div>
    );
}
