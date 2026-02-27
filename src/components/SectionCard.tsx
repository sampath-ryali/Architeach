import React from 'react';
import { motion } from 'motion/react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group"
    >
      <div className="flex items-center gap-4 mb-6">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
      </div>
      <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[15px]">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionCard;
