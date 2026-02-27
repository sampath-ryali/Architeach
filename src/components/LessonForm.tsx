import React, { useState } from 'react';
import { BookOpen, GraduationCap, Clock, Layers, Globe, Send } from 'lucide-react';

interface LessonFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    grade: '',
    subject: '',
    topic: '',
    duration: 45,
    difficulty: 'Intermediate',
    curriculum: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <GraduationCap size={16} className="text-indigo-500" />
            Grade Level
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. 5th Grade"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            required
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BookOpen size={16} className="text-indigo-500" />
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Science"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            required
          />
        </div>

        {/* Topic */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Layers size={16} className="text-indigo-500" />
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g. The Water Cycle"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            required
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Clock size={16} className="text-indigo-500" />
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="5"
            max="300"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            required
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Layers size={16} className="text-indigo-500" />
            Difficulty
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Curriculum */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Globe size={16} className="text-indigo-500" />
            Curriculum / Standards
          </label>
          <input
            type="text"
            name="curriculum"
            value={formData.curriculum}
            onChange={handleChange}
            placeholder="e.g. Common Core, IB, CBSE"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
          isLoading
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] hover:shadow-indigo-200'
        }`}
      >
        {isLoading ? (
          'Architecting...'
        ) : (
          <>
            <Send size={18} />
            Generate Lesson Plan
          </>
        )}
      </button>
    </form>
  );
};

export default LessonForm;
