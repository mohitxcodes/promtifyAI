import { FiPlus, FiMessageSquare } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export interface Message {
    role: 'user' | 'ai';
    content: string;
}

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
}

interface SidebarProps {
    conversations: Conversation[];
    activeId: string;
    onSelect: (id: string) => void;
    onNewChat: () => void;
}

export default function Sidebar({ conversations, activeId, onSelect, onNewChat }: SidebarProps) {
    return (
        <aside className="w-[280px] h-screen border-r border-white/5 bg-[#050509] flex flex-col pt-0 z-30 shadow-2xl relative overflow-hidden flex-shrink-0">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-40 bg-indigo-900/10 blur-[50px] pointer-events-none" />

            {/* Brand Header */}
            <div className="flex flex-col gap-4 px-5 py-6 mb-2 relative z-10">
                <Link to="/" className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20">
                        <BsStars className="text-white text-lg" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">PromptifyAI</span>
                </Link>

                <button
                    onClick={onNewChat}
                    className="w-full relative group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 transition-all duration-200"
                >
                    <div className="absolute inset-0 rounded-xl border border-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FiPlus className="text-indigo-400 text-lg" />
                    <span className="text-sm font-semibold text-gray-200">New Chat</span>
                </button>
            </div>

            {/* List Header */}
            <div className="px-6 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your Chats</span>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {conversations.map(c => (
                    <button
                        key={c.id}
                        onClick={() => onSelect(c.id)}
                        className={`w-full group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${c.id === activeId
                            ? 'bg-indigo-500/10 border border-indigo-500/20 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                            }`}
                    >
                        {/* Interactive indicator for active state */}
                        {c.id === activeId && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
                        )}

                        <FiMessageSquare className={`text-lg flex-shrink-0 transition-colors ${c.id === activeId ? 'text-indigo-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                        <span className="text-sm font-medium truncate w-full text-left">{c.title || 'Untitled Chat'}</span>
                    </button>
                ))}
            </div>

            {/* Footer / User / Settings */}
            <div className="p-4 mt-auto border-t border-white/5 bg-[#08080c]">
                <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center ring-2 ring-black group-hover:ring-gray-700 transition-all">
                        <span className="text-xs font-bold text-white">U</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">User</p>
                        <p className="text-xs text-gray-500 truncate">Free Plan</p>
                    </div>
                </button>
            </div>
        </aside>
    );
}
