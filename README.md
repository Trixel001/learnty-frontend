# Learnty - AI-Powered Learning Platform

An intelligent learning platform with spaced repetition, AI-powered study tools, and personalized learning paths.

## Features

- **AI Chatbot**: Interactive learning assistance
- **AI Flashcard Generation**: Automatically create study materials
- **AI Quiz Generation**: Generate custom quizzes from your content
- **Spaced Repetition**: SM-2 algorithm for optimal learning intervals
- **Learning Analytics**: Track progress and performance
- **Dark Mode**: Full theme support
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI
- **Backend**: Supabase (Database + Edge Functions)
- **AI**: OpenRouter API integration
- **Charts**: Recharts
- **State**: Zustand

## Deployment

This app is configured for Vercel deployment:
1. Push to GitHub
2. Import repository in Vercel
3. Vercel will automatically build and deploy

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Environment

The app is configured with Supabase credentials. Update `src/lib/config.ts` if needed.

Built with ❤️ by MiniMax Agent
