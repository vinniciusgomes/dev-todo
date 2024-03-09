'use client'

import { Calendar } from 'lucide-react'

import { PhraseOfTheDay } from './_components/phrase-of-the-day'
import { NewTask } from './_components/task/new-task'
import { TaskList } from './_components/task/task-list'
import { WelcomeText } from './_components/welcome-text'

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-10">
      <WelcomeText />

      <div className="mb-[-16px]">
        <PhraseOfTheDay />
      </div>

      <div className="top-0 z-50 bg-background pt-4 lg:sticky">
        <NewTask />
      </div>

      <div>
        <TaskList
          listName="Today"
          listIcon={Calendar}
          listDescription="All things to-do to day"
          defaultOpen
        />
      </div>
    </div>
  )
}
