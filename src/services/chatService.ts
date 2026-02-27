
import { knowledgeBase } from '../data/knowledgeBase';
import type { KnowledgeItem } from '../data/knowledgeBase';

export interface ChatResponse {
    answer: string;
    followUps: string[];
}

const OUT_OF_KNOWLEDGE_RESPONSE: ChatResponse = {
    answer: "I'm sorry, that's out of my knowledge. I can only help with information related to Ottobon Academy and our Digital Twin mentorship platform.",
    followUps: ["What is Ottobon Academy?", "How do Digital Twins work?", "What courses do you offer?"]
};

export const processUserQuery = (query: string): ChatResponse => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) return {
        answer: "How can I help you today?",
        followUps: ["What is Ottobon Academy?", "How do Digital Twins work?", "Show me the subjects."]
    };

    const tokens = normalizedQuery.split(/\W+/).filter(t => t.length > 2);

    let bestMatch: KnowledgeItem | null = null;
    let highestScore = 0;

    for (const item of knowledgeBase) {
        let currentScore = 0;

        // Exact keyword match
        item.keywords.forEach(keyword => {
            if (normalizedQuery.includes(keyword.toLowerCase())) {
                currentScore += 10;
            }
        });

        // Token match
        tokens.forEach(token => {
            if (item.keywords.some(k => k.toLowerCase().includes(token))) {
                currentScore += 2;
            }
        });

        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatch = item;
        }
    }

    // Threshold for matching
    if (bestMatch && highestScore >= 5) {
        return {
            answer: bestMatch.answer,
            followUps: bestMatch.followUps || []
        };
    }

    return OUT_OF_KNOWLEDGE_RESPONSE;
};
