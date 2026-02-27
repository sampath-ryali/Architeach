export interface LessonData {
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

export interface LessonRequest {
  grade: string;
  subject: string;
  topic: string;
  duration: number;
  difficulty: string;
  curriculum: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  request: LessonRequest;
  response: LessonData;
}

export interface User {
  email: string;
  name: string;
}
