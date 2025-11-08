// SRS Utility functions to maintain compatibility with existing code
import { calculateNextReview, type SM2Result } from './sm2Algorithm'

// Simple utility functions for compatibility
export function calculateSM2(quality: number, easeFactor: number, interval: number, repetitions: number): any {
  const result = calculateNextReview(quality, easeFactor, interval, repetitions, new Date())
  return {
    easinessFactor: result.easinessFactor,
    easeFactor: result.easinessFactor, // For compatibility
    interval: result.interval,
    repetitions: result.repetitions,
    nextReviewDate: result.nextReviewDate,
    qualityAssessment: result.qualityAssessment,
    optimalReviewTime: result.optimalReviewTime,
    neuroscience_insights: result.neuroscience_insights
  }
}

export function calculateNextReviewDate(interval: number): Date {
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + interval)
  return nextDate
}

export function getDueCards(cards: any[]): any[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return cards.filter(card => {
    if (!card.next_review) return true
    return new Date(card.next_review) <= today
  })
}

export function getConfidenceText(rating: number): string {
  const texts = {
    0: "Complete Blackout",
    1: "Barely Remembered", 
    2: "Recognized",
    3: "Difficult Recall",
    4: "Some Hesitation",
    5: "Perfect Recall"
  }
  return texts[rating as keyof typeof texts] || "Unknown"
}

export function sortCardsByDueDate(cards: any[]): any[] {
  return [...cards].sort((a, b) => {
    const dateA = new Date(a.next_review || 0)
    const dateB = new Date(b.next_review || 0)
    return dateA.getTime() - dateB.getTime()
  })
}

export type SRSCard = {
  id: string
  question: string
  answer: string
  ease_factor: number
  interval_days: number
  review_count: number
  next_review: string
  user_id: string
  milestone_id?: string
  created_at: string
  updated_at: string
}
