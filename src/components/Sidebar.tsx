import { FiPlus } from 'react-icons/fi';

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
        <aside className="w-64 border-r border-gray-900 bg-[#0f0f17] flex flex-col">
            {/* Brand */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
                <span className="text-xl font-bold tracking-tight">PromptifyAI</span>
                <button
                    onClick={onNewChat}
                    className="p-2 rounded-md hover:bg-gray-800 text-gray-300"
                    title="New Chat"
                >
                    <FiPlus />
                </button>
            </div>
            {/* Conversation list */}
            <h2 className="px-4 py-2 text-sm uppercase tracking-wide text-gray-500 border-b border-gray-800">Chats</h2>
            <div className="flex-1 overflow-y-auto">
                {conversations.map(c => (
                    <button
                        key={c.id}
                        onClick={() => onSelect(c.id)}
                        className={`w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-gray-800 truncate ${c.id === activeId ? 'bg-gray-800 text-indigo-400' : 'text-gray-300'
                            }`}
                    >
                        {c.title || 'Untitled Chat'}
                    </button>
                ))}
            </div>
        </aside>
    );
}
