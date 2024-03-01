'use client'

import { Card } from '@/components/ui/card'

import { NewTask } from './_components/new-task'
import { TaskList } from './_components/task-list'

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Good afternoon, Vinnicius ☀️</h1>
        <span className="text-sm text-muted-foreground">
          It's Monday, 01 March 2024
        </span>
      </div>

      <div className="mb-[-16px]">
        <p className="mb-3 font-semibold">Phrase of the day</p>
        <Card className="flex items-start gap-4 p-6 shadow-none">
          <span className="text-lg">💡</span>
          <span className="text-sm text-muted-foreground">
            It's a force that doesn't have much explanation, capable of moving
            mountains. It's the hope that doesn't waver in the face of
            difficulties and the confidence that everything will be fine when
            you have God in your heart.
          </span>
        </Card>
      </div>

      <div className="top-0 z-50 bg-background pt-4 lg:sticky">
        <NewTask />
      </div>

      <div>
        <TaskList
          listName="Today"
          listIcon="📅"
          listDescription="All things to-do to day"
          defaultOpen
        />
      </div>
    </div>
  )
}
