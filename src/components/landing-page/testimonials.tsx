'use client'

import { InfiniteMovingCards } from './testimonials-card'

export function Testimonials() {
  return (
    <div className="relative mx-auto flex h-[40rem] max-w-7xl flex-col overflow-hidden rounded-md sm:px-6 lg:px-8">
      <div className="mb-16 max-w-3xl">
        <h2 className="text-4xl font-bold capitalize text-white">
          Testimonials
        </h2>
        <p className="mt-6 text-muted-foreground">
          Easily manage your tasks all in one place. Simplify your workflow and
          stay focused on development. Created by developers for developers.
        </p>
      </div>

      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  )
}

const testimonials = [
  {
    quote:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: 'William Shakespeare',
    title: 'Hamlet',
  },
  {
    quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
  },
  {
    quote:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    quote:
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
  },
]
