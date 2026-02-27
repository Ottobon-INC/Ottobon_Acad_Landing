
export interface KnowledgeItem {
    id: string;
    keywords: string[];
    answer: string;
    category: 'general' | 'digital-twin' | 'learning' | 'career' | 'accessibility';
    followUps?: string[];
}

export const knowledgeBase: KnowledgeItem[] = [
    {
        id: 'what-is-ottobon',
        keywords: ['ottobon', 'what is', 'academy', 'about', 'overview', 'vision'],
        category: 'general',
        answer: "Ottobon Academy is where we turn learners into masters. We use AI 'Digital Twins' of real experts to give you elite mentorship, no matter where you live.",
        followUps: ["How do Digital Twins work?", "What courses do you offer?", "Is it for people in small cities?"]
    },
    {
        id: 'digital-twin',
        keywords: ['digital twin', 'ai replica', 'mentor', 'expert', 'how it works', 'replica'],
        category: 'digital-twin',
        answer: "Think of a Digital Twin as a 24/7 AI version of a top industry expert. It's trained on their specific knowledge and teaching style, so you get their wisdom anytime you need it.",
        followUps: ["Is the info accurate?", "Can I talk to real humans too?", "How does it help me learn?"]
    },
    {
        id: 'human-verified',
        keywords: ['accuracy', 'verify', 'human', 'hallucination', 'trust', 'expert verified'],
        category: 'digital-twin',
        answer: "Yes, 100%! Every answer is verified by our human experts. We have a 'No-Hallucination' rule, so you only get proven, reliable advice.",
        followUps: ["Tell me about the mentors.", "How do I start learning?", "What is the Training Wheels framework?"]
    },
    {
        id: 'binge-learning',
        keywords: ['binge', 'netflix', 'learning style', 'short segments', 'episodes', 'snackable'],
        category: 'learning',
        answer: "We made learning as addictive as Netflix! Instead of boring 3-hour lectures, you get snackable 5-15 minute episodes based on your progress.",
        followUps: ["What's the Training Wheels framework?", "See all offerings", "How does it adapt to me?"]
    },
    {
        id: 'training-wheels',
        keywords: ['training wheels', 'framework', 'pedagogy', 'phases', 'stages', 'methodology'],
        category: 'learning',
        answer: "We use a 4-step journey: 1) We guide you, 2) We nudge you, 3) You solve it solo, and 4) You master the creative design. It's built so you're never overwhelmed.",
        followUps: ["What are the 4 stages?", "Can I see the courses?", "How long does it take?"]
    },
    {
        id: 'offerings',
        keywords: ['offerings', 'courses', 'programs', 'what do you offer', 'cohort', 'on-demand', 'workshops'],
        category: 'learning',
        answer: "We have something for everyone: structured Cohort programs, binge-ready On-Demand episodes, and quick-skill Workshops. Plus, AI tools to build your career.",
        followUps: ["Tell me about career tools.", "What subjects do you teach?", "How do I join a cohort?"]
    },
    {
        id: 'career-tools',
        keywords: ['resume', 'interview', 'job', 'ats', 'career tools', 'growth'],
        category: 'career',
        answer: "We don't just teach; we help you get hired. We offer ATS-optimized resume builders, AI mock interviews, and smart job matching based on your personality.",
        followUps: ["How does job matching work?", "Tell me about workshops.", "Can I talk to a mentor?"]
    },
    {
        id: 'accessibility',
        keywords: ['tier 2', 'tier 3', 'small city', 'geography', 'location', 'accessibility', 'vizag', 'varanasi'],
        category: 'accessibility',
        answer: "Distance doesn't matter anymore. Whether you're in a tiny town or a big city, Ottobon gives you the exact same elite mentorship and global opportunities.",
        followUps: ["What is a Digital Twin?", "Tell me about the vision.", "How do I sign up?"]
    },
    {
        id: 'experts',
        keywords: ['who are the experts', 'mentors', 'industry experts', 'real humans'],
        category: 'digital-twin',
        answer: "Our mentors are real industry pros. We capture their genius in Digital Twins so they can help thousands of people at once, but they also host live sessions for the big stuff.",
        followUps: ["Can I talk to them live?", "What is a Digital Twin?", "Show me the subjects."]
    },
    {
        id: 'subjects',
        keywords: ['subjects', 'topics', 'ai for ui/ux', 'marketing', 'growth', 'ai agents', 'consulting'],
        category: 'learning',
        answer: "Right now, we're focused on high-impact fields: AI for UI/UX, AI Marketing, AI Agent Development, and Digital Transformation Consulting.",
        followUps: ["Tell me about AI for UI/UX.", "What is AI Agent Development?", "Are there more subjects?"]
    }
];
