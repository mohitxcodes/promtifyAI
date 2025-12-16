import { useRef, useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { BsStars } from 'react-icons/bs';
import Sidebar from '../../components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /* ----------------------------- Persistence ----------------------------- */
    useEffect(() => {
        const stored = localStorage.getItem('promptify_convos');
        if (stored) {
            try {
                const parsed: Conversation[] = JSON.parse(stored);
                setConversations(parsed);
                if (parsed.length && !activeId) setActiveId(parsed[0].id);
            } catch (e) {
                console.error("Failed to parse conversations", e);
            }
        }
        if (!stored || JSON.parse(stored).length === 0) {
            createNewConversation();
        }
    }, []);

    const persist = (convos: Conversation[]) => {
        localStorage.setItem('promptify_convos', JSON.stringify(convos));
    };

    const activeConvo = conversations.find(c => c.id === activeId) || conversations[0];

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const createNewConversation = () => {
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

    const updateConversationMessages = (convoId: string, newMessages: Message[]) => {
        setConversations(prev => {
            const updated = prev.map(c =>
                c.id === convoId ? { ...c, messages: newMessages } : c
            );
            persist(updated);
            return updated;
        });
    };

    const sendMessage = async () => {
        if (!input.trim() || !activeId || isTyping) return;

        const currentInput = input.trim();
        setInput('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        const userMessage: Message = { role: 'user', content: currentInput };
        const currentMessages = activeConvo?.messages || [];
        const newMessages = [...currentMessages, userMessage];

        // Optimistically update UI
        updateConversationMessages(activeId, newMessages);
        setIsTyping(true);

        // Update title if it's the first user message
        if (currentMessages.length === 1 && activeConvo?.title === 'New Chat') {
            const newTitle = currentInput.length > 30 ? currentInput.substring(0, 30) + '...' : currentInput;
            setConversations(prev => {
                const updated = prev.map(c =>
                    c.id === activeId ? { ...c, title: newTitle } : c
                );
                persist(updated);
                return updated;
            });
        }

        try {
            const res = await fetch("https://promtifyai-backend.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [userMessage] }),
            });

            if (!res.ok) throw new Error(`API Error: ${res.status}`);

            const data = await res.json();
            const aiMessage: Message = { role: 'ai', content: data.reply || "I didn't catch that. Could you say it again?" };

            updateConversationMessages(activeId, [...newMessages, aiMessage]);
        } catch (error) {
            console.error("Error calling AI API:", error);
            const errorMessage: Message = { role: 'ai', content: "⚠️ System Error: Unable to reach the AI. Please try again later." };
            updateConversationMessages(activeId, [...newMessages, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [activeConvo?.messages, isTyping, activeId]);

    /* ----------------------------- UI ----------------------------- */
    return (
        <div className="h-screen w-full flex bg-[#050509] text-gray-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
            {/* Sidebar - Fixed width handled by component */}
            <div className="flex-shrink-0">
                <Sidebar
                    conversations={conversations}
                    activeId={activeId}
                    onSelect={setActiveId}
                    onNewChat={createNewConversation}
                />
            </div>

            {/* Main Chat Column */}
            <div className="flex-1 flex flex-col h-full relative min-w-0 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[100px]" />
                </div>

                {/* Header */}
                <header className="w-full px-8 py-5 border-b border-white/5 bg-[#0a0a13]/80 flex items-center justify-between backdrop-blur-md flex-shrink-0 relative z-20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                            <BsStars className="text-indigo-400 text-lg" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-wide">Promptify AI</h2>
                            <p className="text-xs text-indigo-300 font-medium">Always ready to help</p>
                        </div>
                    </div>
                    <span className="text-xs font-mono text-gray-500 border border-white/5 px-3 py-1 rounded-full bg-white/5">
                        Powered by Grok API
                    </span>
                </header>

                {/* Chat Messages - Scrollable Area */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto px-4 md:px-0 py-8 relative z-10 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
                >
                    <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-4">
                        <AnimatePresence initial={false}>
                            {activeConvo?.messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 ring-2 ring-indigo-500/20'
                                            : 'bg-gray-800 border border-white/10 ring-2 ring-white/5'
                                            }`}>
                                            {msg.role === 'user'
                                                ? <span className="text-xs font-bold text-white">U</span>
                                                : <FaRobot className="text-indigo-300 text-sm" />
                                            }
                                        </div>

                                        {/* Message Bubble */}
                                        <div
                                            className={`px-6 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm backdrop-blur-sm overflow-hidden ${msg.role === 'user'
                                                ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-tr-sm shadow-indigo-900/20'
                                                : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-sm shadow-black/10 w-full'
                                                }`}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <div className="rounded-md overflow-hidden my-3 border border-white/10 shadow-lg">
                                                                <div className="bg-gray-900/50 px-3 py-1 text-xs text-gray-500 border-b border-white/5 font-mono flex items-center justify-between">
                                                                    <span>{match[1]}</span>
                                                                </div>
                                                                <SyntaxHighlighter
                                                                    style={atomDark}
                                                                    language={match[1]}
                                                                    PreTag="div"
                                                                    customStyle={{ margin: 0, padding: '1.5rem', background: '#0a0a0f', fontSize: '0.875rem' }}
                                                                    {...props}
                                                                >
                                                                    {String(children).replace(/\n$/, '')}
                                                                </SyntaxHighlighter>
                                                            </div>
                                                        ) : (
                                                            <code className={`${msg.role === 'user' ? 'bg-white/20' : 'bg-white/10'} px-1.5 py-0.5 rounded text-[13px] font-mono`} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>,
                                                    li: ({ children }) => <li className="pl-1">{children}</li>,
                                                    h1: ({ children }) => <h1 className="text-xl font-bold mb-3 mt-4 text-white pb-2 border-b border-white/10">{children}</h1>,
                                                    h2: ({ children }) => <h2 className="text-lg font-bold mb-3 mt-4 text-white">{children}</h2>,
                                                    h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-3 text-gray-100">{children}</h3>,
                                                    blockquote: ({ children }) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 my-3 bg-white/5 rounded-r italic text-gray-300">{children}</blockquote>,
                                                    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">{children}</a>,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing Indicator */}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start w-full"
                            >
                                <div className="flex gap-4 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 ring-2 ring-white/5">
                                        <FaRobot className="text-indigo-300 text-sm" />
                                    </div>
                                    <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-1.5 h-[46px]">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={chatRef} />
                    </div>
                </div>

                {/* Input Bar - Fixed at bottom */}
                <div className="w-full relative z-20 px-4 md:px-0 pb-6 pt-4 bg-gradient-to-t from-[#050509] via-[#050509] to-transparent flex-shrink-0">
                    <form
                        className="w-full max-w-3xl mx-auto relative group"
                        onSubmit={e => {
                            e.preventDefault();
                            sendMessage();
                        }}
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

                        <div className="relative flex items-end gap-2 bg-[#0a0a13] p-2 pr-2 rounded-3xl border border-white/10 shadow-2xl focus-within:border-indigo-500/30 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message PromptifyAI..."
                                rows={1}
                                className="flex-1 max-h-32 px-4 py-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none resize-none scrollbar-hide text-base leading-6"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="mb-1 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 disabled:shadow-none hover:scale-105 active:scale-95"
                            >
                                {isTyping ? <BiLoaderAlt className="text-xl animate-spin" /> : <FiSend className="text-lg" />}
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-[10px] text-gray-600 mt-3 font-mono">
                        PromptifyAI makes mistakes. Double-check important info.
                    </p>
                </div>
            </div>
        </div>
    );
}