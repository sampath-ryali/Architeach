import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LessonForm from '../components/LessonForm';
import LessonDisplay from '../components/LessonDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import Sidebar from '../components/Sidebar';
import { generateLesson } from '../api/lessonApi';
import { Sparkles, AlertCircle, LogOut, Menu, X } from 'lucide-react';
import { HistoryItem } from '../types';

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('lesson_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('lesson_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (formData: any) => {
    setLoading(true);
    setError(null);
    setLessonData(null);
    setActiveHistoryId(undefined);

    try {
      const data = await generateLesson(formData);
      setLessonData(data);
      
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        request: formData,
        response: data
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
      setActiveHistoryId(newHistoryItem.id);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating the lesson plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setLessonData(item.response);
    setActiveHistoryId(item.id);
    setError(null);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your history?')) {
      setHistory([]);
      localStorage.removeItem('lesson_history');
    }
  };

  const handleNewLesson = () => {
    setLessonData(null);
    setActiveHistoryId(undefined);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="z-40"
          >
            <Sidebar 
              history={history} 
              onSelectItem={handleSelectHistory}
              onClearHistory={handleClearHistory}
              onNewLesson={handleNewLesson}
              activeId={activeHistoryId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={24} />
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Architect
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            {!lessonData && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                  What are we teaching today?
                </h2>
                <p className="text-slate-500 text-lg">
                  Fill in the details below to generate a comprehensive, structured lesson plan.
                </p>
              </motion.div>
            )}

            {/* Form Section */}
            <div className="mb-12">
              <LessonForm onSubmit={handleGenerate} isLoading={loading} />
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3 mb-8"
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State */}
            {loading && (
              <div className="py-20">
                <LoadingSpinner />
              </div>
            )}

            {/* Results Section */}
            <div ref={resultsRef}>
              <AnimatePresence>
                {lessonData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LessonDisplay data={lessonData} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
