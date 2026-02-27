import React from 'react';
import SectionCard from './SectionCard';
import { 
  Target, 
  Wrench, 
  Zap, 
  Lightbulb, 
  Users, 
  Gamepad2, 
  ClipboardCheck, 
  Home as HomeIcon, 
  Split 
} from 'lucide-react';

interface LessonData {
  learning_objectives: string | string[];
  materials_required: string | string[];
  warm_up_activity: string;
  concept_explanation: string;
  guided_practice: string;
  interactive_activity: string;
  assessment_quiz: string;
  homework: string;
  differentiation_strategy: string;
}

interface LessonDisplayProps {
  data: LessonData;
}

const LessonDisplay: React.FC<LessonDisplayProps> = ({ data }) => {
  const formatList = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {content.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    return content;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      <div className="md:col-span-2 flex items-center justify-between mb-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
          <div className="w-3 h-10 bg-indigo-600 rounded-full"></div>
          Lesson Architecture
        </h2>
        <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
          Ready to Teach
        </div>
      </div>

      <SectionCard title="Learning Objectives" icon={<Target size={24} />}>
        {formatList(data.learning_objectives)}
      </SectionCard>

      <SectionCard title="Materials Required" icon={<Wrench size={24} />}>
        {formatList(data.materials_required)}
      </SectionCard>

      <SectionCard title="Warm-up Activity" icon={<Zap size={24} />}>
        {data.warm_up_activity}
      </SectionCard>

      <SectionCard title="Concept Explanation" icon={<Lightbulb size={24} />}>
        {data.concept_explanation}
      </SectionCard>

      <SectionCard title="Guided Practice" icon={<Users size={24} />}>
        {data.guided_practice}
      </SectionCard>

      <SectionCard title="Interactive Activity" icon={<Gamepad2 size={24} />}>
        {data.interactive_activity}
      </SectionCard>

      <SectionCard title="Assessment / Quiz" icon={<ClipboardCheck size={24} />}>
        {data.assessment_quiz}
      </SectionCard>

      <SectionCard title="Homework" icon={<HomeIcon size={24} />}>
        {data.homework}
      </SectionCard>

      <div className="md:col-span-2">
        <SectionCard title="Differentiation Strategy" icon={<Split size={24} />}>
          {data.differentiation_strategy}
        </SectionCard>
      </div>
    </div>
  );
};

export default LessonDisplay;
