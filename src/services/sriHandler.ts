import type { ChatRequest, ChatResponse, UserContext, MentorProfile } from '../types/chat';

/**
 * SRI Handler: The "Pure Processing" Pipe
 * 
 * PHASES:
 * 1. Identity Resolution (uid)
 * 2. Context Hydration (history, stage, persona)
 * 3. Pure Processing (AI logic)
 * 4. State Commit (save to DB)
 */

// Mock DB connector (to be replaced with Supabase)
const db_connector = {
    get_user_context: async (uid: string): Promise<UserContext> => {
        // Hydration: Fetching specific student state
        return {
            userId: uid,
            name: "Student",
            trainingWheelsStage: 1, // Default to Stage 1: Guided
            recentHistory: []
        };
    },
    get_mentor_profile: async (mid: string): Promise<MentorProfile> => {
        // Hydration: Fetching specific Digital Twin persona
        return {
            mentorId: mid,
            name: "Expert Mentor",
            expertise: ["UI/UX", "AI Agents"],
            personaTraits: ["Encouraging", "Precise"]
        };
    },
    save_interaction: async (uid: string, _message: string, _answer: string) => {
        // State Commit: Externalize the interaction
        console.log(`[SRI Commit] Saved interaction for ${uid}`);
    }
};

// Pure Logic: Output depends ONLY on these inputs
const ai_logic = {
    generate_response: async (message: string, context: UserContext, mentor: MentorProfile): Promise<string> => {
        // Here we would call the LLM with the hydrated context
        // This ensures the AI respects the student's mastery stage (1-4)

        const intro = `Hello ${context.name}, I'm your Digital Twin of ${mentor.name}.`;

        switch (context.trainingWheelsStage) {
            case 1:
                return `${intro} [Stage 1: Guided] Let's break this down together. For your question about "${message}", here is a step-by-step walkthrough...`;
            case 2:
                return `${intro} [Stage 2: Assisted] Good question on "${message}". I'll give you a hint: try looking at it from a ${mentor.expertise[0]} perspective. What do you think your first move should be?`;
            case 3:
                return `${intro} [Stage 3: Independent] You've got this! For "${message}", go ahead and try implementing the core logic. I'm here if you get stuck, but I'll let you lead.`;
            case 4:
                return `${intro} [Stage 4: Abstract] Excellent. Now that you've mastered "${message}", let's connect it to larger ${mentor.expertise[1]} patterns. How would this scale?`;
            default:
                return `${intro} How can I help you today with your ${mentor.expertise.join(', ')} journey?`;
        }
    }
};

export const handleSriRequest = async (req: ChatRequest): Promise<ChatResponse> => {
    // --- PHASE 1: IDENTITY RESOLUTION ---
    const uid = req.userId;
    const mid = req.mentorId;

    // --- PHASE 2: CONTEXT HYDRATION ---
    // Fetch into LOCAL request memory only
    const [userContext, mentorProfile] = await Promise.all([
        db_connector.get_user_context(uid),
        db_connector.get_mentor_profile(mid)
    ]);

    // --- PHASE 3: PURE PROCESSING ---
    const answer = await ai_logic.generate_response(req.message, userContext, mentorProfile);

    // --- PHASE 4: STATE COMMIT ---
    await db_connector.save_interaction(uid, req.message, answer);

    return {
        answer,
        followUps: ["Next step?", "Show more context"],
        stage: userContext.trainingWheelsStage
    };
};
