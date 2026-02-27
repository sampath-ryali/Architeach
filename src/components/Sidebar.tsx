import React from 'react';
import { HistoryItem } from '../types';
import { Clock, ChevronRight, Trash2, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
  onNewLesson: () => void;
  activeId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  history, 
  onSelectItem, 
  onClearHistory, 
  onNewLesson,
  activeId 
}) => {
  return (
    <aside className="w-80 h-screen bg-white border-r border-slate-100 flex flex-col shrink-0 sticky top-0 overflow-hidden">
      <div className="p-6 border-bottom border-slate-50">
        <button
          onClick={onNewLesson}
          className="w-full py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <PlusCircle size={18} />
          New Lesson Plan
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
        <div className="px-2 py-4 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Clock size={14} />
            Recent Activity
          </h3>
          {history.length > 0 && (
            <button 
              onClick={onClearHistory}
              className="text-slate-400 hover:text-red-500 transition-colors"
              title="Clear History"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-slate-400 text-sm italic">No previous plans yet</p>
          </div>
        ) : (
          history.map((item) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onSelectItem(item)}
              className={`w-full text-left p-4 rounded-2xl transition-all group relative ${
                activeId === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-sm font-bold truncate ${activeId === item.id ? 'text-white' : 'text-slate-900'}`}>
                  {item.request.topic}
                </span>
                <div className="flex items-center gap-2 text-[10px] opacity-70">
                  <span className="uppercase font-bold tracking-tighter">{item.request.grade}</span>
                  <span>•</span>
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
              <ChevronRight 
                size={14} 
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${
                  activeId === item.id ? 'text-white' : 'text-slate-300 group-hover:translate-x-1'
                }`} 
              />
            </motion.button>
          ))
        )}
      </div>

      <div className="p-6 border-t border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Jane Doe</span>
            <span className="text-[10px] text-slate-400 font-medium">Premium Educator</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
