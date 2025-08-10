import { useRef, useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
}

const initialMessages: Message[] = [
    { role: 'ai', content: 'Hi! I am PromptifyAI. How can I help you today?' },
];

export default function ChatPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [input, setInput] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    /* ----------------------------- Persistence ----------------------------- */
    useEffect(() => {
        const stored = localStorage.getItem('promptify_convos');
        if (stored) {
            const parsed: Conversation[] = JSON.parse(stored);
            setConversations(parsed);
            if (parsed.length) setActiveId(parsed[0].id);
        } else {
            const first: Conversation = {
                id: Date.now().toString(),
                title: 'New Chat',
                messages: initialMessages,
            };
            setConversations([first]);
            setActiveId(first.id);
        }
    }, []);

    const persist = (convos: Conversation[]) => {
        localStorage.setItem('promptify_convos', JSON.stringify(convos));
    };

    /* ----------------------------- Helpers ----------------------------- */
    const activeConvo = conversations.find(c => c.id === activeId);

    const sendMessage = async () => {
        if (!input.trim() || !activeConvo) return;

        const userMessage = { role: 'user' as const, content: input };

        // Add user's message immediately
        const updatedUser = conversations.map(c =>
            c.id === activeId
                ? { ...c, messages: [...c.messages, userMessage] }
                : c
        );
        setConversations(updatedUser);
        persist(updatedUser);
        setInput('');

        try {
            const res = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [userMessage] }),
            });

            const data = await res.json();
            const aiMessage = { role: 'ai' as const, content: data.reply || "No response from AI." };

            const updatedAI = conversations.map(c =>
                c.id === activeId
                    ? { ...c, messages: [...c.messages, userMessage, aiMessage] }
                    : c
            );
            setConversations(updatedAI);
            persist(updatedAI);
        } catch (error) {
            console.error("Error calling AI API:", error);
            const errorMessage = { role: 'ai' as const, content: "⚠️ Error: Could not get AI response." };

            const updatedError = conversations.map(c =>
                c.id === activeId
                    ? { ...c, messages: [...c.messages, userMessage, errorMessage] }
                    : c
            );
            setConversations(updatedError);
            persist(updatedError);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    };

    const startNewChat = () => {
        const newConvo: Conversation = {
            id: Date.now().toString(),
            title: 'New Chat',
            messages: initialMessages,
        };
        const updated = [newConvo, ...conversations];
        setConversations(updated);
        setActiveId(newConvo.id);
        persist(updated);
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [conversations, activeId]);

    /* ----------------------------- UI ----------------------------- */
    return (
        <div className="min-h-screen flex bg-[#0a0a13] text-white font-sans">
            {/* Sidebar */}
            <Sidebar
                conversations={conversations}
                activeId={activeId}
                onSelect={setActiveId}
                onNewChat={startNewChat}
            />

            {/* Main Chat Column */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="w-full px-6 py-4 border-b border-gray-900 bg-[#0f0f17]/80 flex items-center justify-between sticky top-0 z-20 shadow-md backdrop-blur">
                    <span className="text-md font-semibold tracking-tight text-white">
                        <span className="text-indigo-400">Hi, </span>
                        There how are you!!
                    </span>
                    <span className="text-xs text-gray-400">Powered by Groq</span>
                </header>

                {/* Chat Messages */}
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto px-2 md:px-0 py-8 max-w-2xl mx-auto w-full"
                >
                    <div className="flex flex-col gap-6">
                        {activeConvo?.messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-md text-base whitespace-pre-line ${msg.role === 'user'
                                        ? 'bg-gray-700 text-white border border-gray-600'
                                        : 'bg-gray-800 text-white border border-gray-700'
                                        }`}
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
        </div>
    );
}