
export interface ChatRequest {
    userId: string;
    mentorId: string;
    message: string;
}

export interface ChatResponse {
    answer: string;
    followUps: string[];
    stage: number; // The "Training Wheels" stage (1-4)
}

export interface UserContext {
    userId: string;
    name: string;
    trainingWheelsStage: number;
    recentHistory: { role: 'user' | 'assistant', content: string }[];
}

export interface MentorProfile {
    mentorId: string;
    name: string;
    expertise: string[];
    personaTraits: string[];
}
