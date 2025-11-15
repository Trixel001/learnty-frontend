<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# You are a programmer who usually make use of different AI chatbot tools to create your website and project and you need a file that serves as a context for all changes or improvements all updates me to your projects I would like you to use this document of provided understand the context understand the latest changes and the previous changees file and create a context file the courage the memory of the progress made so when uploaded on any AI platform it understand the context before giving answers

Based on the comprehensive project documentation and development history, I'll create a context file that serves as an AI assistant memory/context document for your Learnty project.[^1][^2][^3][^4][^5][^6]

# **LEARNTY PROJECT CONTEXT FILE**

## AI Assistant Memory \& Development History Document

### Version 2.0 | Last Updated: November 12, 2025


***

## **PROJECT IDENTITY**

### Core Vision

Learnty transforms static book content into **interactive, AI-powered, project-based learning experiences** using neuroscience principles (Jim Kwik's FASTER method) and spaced repetition (SM-2 algorithm).[^5][^6]

### Tagline

*"To make book-based learning as engaging, interactive, and applicable as playing a game - turning readers into doers."*

***

## **CURRENT TECHNICAL STACK**

### **Frontend**

- **Framework:** React 18 + TypeScript + Vite
- **UI Library:** Radix UI components, Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router
- **Animation:** Framer Motion
- **Repository:** [learnty-frontend](https://github.com/Trixel001/learnty-frontend) (Main repo)
- **Deployment:** Vercel (live production)


### **Backend**

- **Platform:** Supabase (PostgreSQL database + Edge Functions)
- **Edge Functions Runtime:** Deno
- **AI Provider:** **Google Gemini API** (gemini-2.5-flash-lite model)
    - **Previous:** Migrated from OpenRouter API (October 2025)
- **Authentication:** Supabase Auth (JWT-based)
- **File Storage:** Supabase Storage buckets


### **Database Schema** (Supabase/PostgreSQL)

```sql
-- Core tables (simplified overview)
users (id, email, created_at, subscription_tier)
books (id, user_id, title, content_hash, file_url, processing_status)
learning_roadmaps (id, book_id, user_id, roadmap_data JSONB, completion_percentage)
srs_cards (id, user_id, book_id, question, answer, difficulty, easiness_factor, interval, repetitions, next_review_date)
ai_usage_logs (id, user_id, feature_type, tokens_used, timestamp)
ai_generated_content (id, user_id, book_id, content_type, content_data JSONB)
```


### **Environment Variables**

**Backend (Supabase Secrets):**

- `GEMINI_API_KEY` - Google Gemini API key (backend-only)
- `SERVICE_ROLE_KEY` - Supabase service role key
- `BASE_URL` - Supabase project URL

**Frontend (Vite):**

- `VITE_SUPABASE_URL` - Public Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Public anonymous key

***

## **AI FEATURES \& ARCHITECTURE**

### **1. AI Chatbot (Conversational Tutor)**

- **Edge Function:** `ai-chatbot`
- **Model:** `gemini-2.5-flash-lite`
- **Behavior:** Step-by-step conversational flow (not all-at-once responses)
- **Latest Update (Nov 12, 2025):** Refactored frontend (`AIChatbot.tsx`) to support multi-turn conversations with full context history[^3]
- **Teaching Method:** Jim Kwik's FASTER method (Forget, Active, State, Teach, Enter, Review)
- **Key Feature:** Ends each response with follow-up questions to maintain engagement


### **2. AI Flashcard Generator**

- **Edge Function:** `generate-ai-flashcards`
- **Model:** `gemini-2.5-flash-lite`
- **Features:**
    - Neuroscience-optimized cards (elaborative interrogation, dual coding)
    - Memory techniques (acronyms, visualization, stories, analogies)
    - Difficulty-based review intervals (easy/medium/hard)
    - Application examples and memory hooks


### **3. Topic Learning Path Generator**

- **Edge Function:** `generate-topic-learning-path`
- **Model:** `gemini-2.5-flash-lite`
- **Methodology:** S3 (Small Simple Steps) - 15-30 minute learning sessions
- **Features:**
    - Milestone-based progression
    - Interleaving practice (mixing topics)
    - Neuroscience principles (primacy/recency effect, dual coding)
    - Gamification (XP, achievements, streaks)


### **4. Spaced Repetition System (SRS)**

- **Algorithm:** SM-2 (SuperMemo 2) with neuroscience optimizations
- **File:** `src/lib/sm2Algorithm.ts`
- **Features:**
    - Circadian rhythm optimization (peak learning at 9-11 AM, 3-5 PM)
    - Quality assessment feedback (0-5 scale)
    - Difficulty-based intervals: easy, medium, hard  days[^4][^1][^3][^5]

***

## **DEVELOPMENT HISTORY \& CRITICAL CHANGES**

### **November 12, 2025: Major Backend Migration**

#### **Migration: OpenRouter → Google Gemini**

- **Reason:** Cost optimization and improved conversational AI capabilities
- **Changes:**
    - All Edge Functions switched from OpenRouter API to Gemini API
    - Model: `gemini-2.5-flash-lite`
    - Environment variable changed: `OPENROUTER_API_KEY` → `GEMINI_API_KEY`


#### **Frontend Refactor: Conversational AI Chatbot**

- **File:** `src/components/AIChatbot.tsx`
- **Change:** Refactored to support step-by-step conversational flow
- **Key Modifications:**
    - Sends **full conversation history** (not just last 6 messages)
    - Input remains enabled after each AI response
    - Handles multi-turn follow-up conversations
    - Backend ends responses with questions (e.g., "Does that make sense?")
- **Commit:** [f484724](https://github.com/Trixel001/learnty-frontend/commit/f484724)[^3]


#### **Security Implementation**

- **Method:** All API keys secured via Supabase environment variables
- **Pattern:** Frontend never exposes API keys - all AI calls routed through Edge Functions
- **Best Practice:** Industry-standard backend proxy architecture


### **October 2025: AI Feature Enhancements**

- Integrated neuroscience principles (Jim Kwik, spaced repetition science)
- Enhanced all AI prompts with memory techniques
- Implemented SM-2 algorithm with circadian rhythm optimization
- Added comprehensive error handling and logging


### **Previous Architecture Notes**

- **Initial Stack Plan (Docs):** Flutter + Python FastAPI backend[^4]
- **Current Reality:** React + Supabase (pragmatic pivot for faster MVP)
- **Original AI Provider:** OpenRouter (Mistral-7B model)

***

## **KNOWN ISSUES \& DEBUGGING CONTEXT**

### **Recent Issues (Resolved)**

1. **White Screen Error** - Component import/syntax errors[^2]
2. **Edge Function Deployment Errors** - Incorrect Deno.serve structure
3. **API Key Exposure Concerns** - Resolved via environment variables

### **Current Status (Nov 12, 2025)**

- ✅ All Edge Functions deployed and working
- ✅ Frontend conversational flow implemented
- ✅ Security best practices in place
- ✅ Gemini API integration complete


### **Testing Checklist**

When uploading to new AI platforms, verify:

- [ ] AI Chatbot: Multi-turn conversations maintain context
- [ ] Flashcard Generator: Creates neuroscience-optimized cards
- [ ] Learning Path: Generates S3 methodology milestones
- [ ] SRS System: Calculates correct review intervals

***

## **PRODUCT ROADMAP**

### **Phase 1: MVP (Current - Completed)**

- ✅ User authentication (Supabase Auth)
- ✅ Book upload and text extraction
- ✅ AI-powered learning roadmap generation
- ✅ Spaced repetition flashcards
- ✅ AI chatbot tutor
- ✅ Progress tracking
- ✅ Mobile-responsive web app


### **Phase 2: Growth Features (Next 6 Months)**

- [ ] Social features (public/private projects)
- [ ] Team collaboration tools
- [ ] Premium subscription tier (\$9.99/month)
- [ ] Advanced analytics dashboard
- [ ] Semantic search (Gemma embeddings)
- [ ] Gamified software training courses


### **Phase 3: Virtual Reality "Virducation" (Long-term)**

- [ ] VR learning environments
- [ ] Virtual labs and hardware training
- [ ] AI virtual tutor (3D avatar)
- [ ] Cross-reality collaboration

***

## **BUSINESS MODEL**

### **Freemium Strategy**

- **Free Tier:** Basic AI features, public projects, community content
- **Premium (\$9.99/month):** Private projects, advanced AI, offline access, no ads
- **Team (\$29.99/month):** Collaboration features, classroom management, analytics
- **Enterprise (Custom):** White-label solutions, SSO, dedicated support


### **Market Opportunity**

- **AI in Education Market:** \$81.13B by 2030
- **Target Users:** Knowledge workers, students, lifelong learners (15M+ TAM)
- **Competitive Advantage:** Only solution for book-to-project transformation with neuroscience-backed AI

***

## **COGNITIVE SCIENCE FOUNDATION**

### **Core Learning Principles**[^1][^2]

1. **Jim Kwik's FASTER Method:**
    - **F**orget: Address misconceptions
    - **A**ctive: Hands-on learning
    - **S**tate: Optimize learning environment
    - **T**each: Learn by teaching others
    - **E**nter: Effective information encoding
    - **R**eview: Spaced repetition
2. **Neuroscience Techniques:**
    - Elaborative interrogation (why/how questions)
    - Dual coding (visual + verbal)
    - Chunking (7±2 information pieces)
    - Memory palace visualization
    - Emotional engagement storytelling
    - Active recall testing
3. **Spaced Repetition Science:**
    - SM-2 algorithm with forgetting curve
    - Optimal review intervals based on difficulty
    - Circadian rhythm timing (peak hours: 9-11 AM, 3-5 PM)

***

## **DEVELOPMENT WORKFLOW \& TOOLS**

### **Version Control**

- **Repository:** [Trixel001/learnty-frontend](https://github.com/Trixel001/learnty-frontend)
- **Branch Strategy:** Main branch for production, feature branches for development
- **Commit Style:** Descriptive commits with context (e.g., "Refactor AIChatbot for conversational flow")


### **Deployment Pipeline**

- **Frontend:** Vercel (auto-deploy from GitHub main branch)
- **Backend:** Supabase Edge Functions (manual deploy or GitHub integration)
- **Database:** Supabase managed PostgreSQL


### **AI Assistant Workflow**

When working with AI assistants on this project:

1. Upload this context file first
2. Reference specific feature areas (e.g., "AI Chatbot", "SRS System")
3. Always verify environment variable names match current setup
4. Check latest commit history before major refactors
5. Test Edge Functions locally before deploying

***

## **KEY FILES \& LOCATIONS**

### **Frontend (learnty-frontend)**

```
src/
├── components/
│   ├── AIChatbot.tsx              # Conversational AI tutor
│   ├── AIFlashcardGenerator.tsx   # Flashcard creation UI
│   ├── TopicLearningGenerator.tsx # Learning path UI
│   └── ...
├── lib/
│   ├── supabase.ts                # Supabase client config
│   ├── sm2Algorithm.ts            # Spaced repetition logic
│   └── config.ts                  # Environment variables
└── ...
```


### **Backend (Supabase)**

```
supabase/functions/
├── ai-chatbot/index.ts
├── generate-ai-flashcards/index.ts
├── generate-topic-learning-path/index.ts
├── generate-ai-quiz/index.ts      # (If exists)
└── ...
```


***

## **IMPORTANT CONTEXT FOR AI ASSISTANTS**

### **When Making Code Changes:**

1. **API Provider:** Always use Gemini API (not OpenRouter)
2. **Model:** Always specify `gemini-2.5-flash-lite`
3. **Environment Variables:** Use exact names from "Environment Variables" section
4. **Security:** Never hardcode API keys - always use `Deno.env.get()`
5. **Conversational AI:** Chatbot must support multi-turn conversations with full history

### **When Debugging:**

1. Check Supabase Edge Function logs first
2. Verify environment variables are set in Supabase dashboard
3. Confirm frontend is calling correct function endpoints
4. Test Edge Functions independently before blaming frontend

### **When Adding Features:**

1. Follow neuroscience principles from "Cognitive Science Foundation"
2. Use existing patterns (check similar components)
3. Update this context file after major changes
4. Test with real user flows, not just unit tests

***

## **QUICK REFERENCE COMMANDS**

### **Frontend Development**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel (auto via GitHub push)
git push origin main
```


### **Backend (Supabase Edge Functions)**

```bash
# Deploy specific function
supabase functions deploy ai-chatbot

# Deploy all functions
supabase functions deploy

# Test function locally
supabase functions serve

# View logs
supabase functions logs ai-chatbot
```


***

## **CONTACT \& RESOURCES**

### **Project Owner**

- **GitHub:** Trixel001
- **Location:** Port Harcourt, Nigeria
- **Working Style:** Mobile-first development, pragmatic solutions, AI-assisted coding


### **Documentation Files**

1. [Project Idea](learnty_project_idea.md) - Original vision
2. [Technical Architecture](02_technical_architecture_document.md) - System design
3. [AI Refactor Task](AI-Agent-Task_-Refactor-Frontend-for-Gemini-Backen.md) - Latest changes
4. [Executive Summary](00_executive_summary_implementation_guide.md) - Strategic overview

### **External Resources**

- Supabase Docs: https://supabase.com/docs
- Gemini API Docs: https://ai.google.dev/docs
- Jim Kwik Learning: https://jimkwik.com
- SM-2 Algorithm: https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method

***

## **VERSION HISTORY**

| Version | Date | Major Changes |
| :-- | :-- | :-- |
| 2.0 | Nov 12, 2025 | Gemini migration, conversational AI refactor |
| 1.5 | Oct 2025 | Neuroscience enhancements, Jim Kwik integration |
| 1.0 | Sep 2025 | Initial MVP launch with OpenRouter |


***

**END OF CONTEXT FILE**

This document should be uploaded to any AI assistant platform at the start of a conversation to provide complete project context. Update this file whenever major architectural changes occur.

<div align="center">⁂</div>

[^1]: I-want-you-to-make-all-AI-features-fully-functiona.pdf

[^2]: What-did-you-do.-My-website-is-showing-pure-white.pdf

[^3]: AI-Agent-Task_-Refactor-Frontend-for-Gemini-Backen.md

[^4]: 02_technical_architecture_document.md

[^5]: learnty_project_idea.md

[^6]: 00_executive_summary_implementation_guide.md

