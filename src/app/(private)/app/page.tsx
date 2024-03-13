'use client'

import { useQuery } from '@tanstack/react-query'
import { Calendar, CalendarDays, CalendarOff, Sunrise } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { getTasks } from '@/services/api/routes'
import { Task } from '@/services/types'

import { PhraseOfTheDay } from './_components/phrase-of-the-day'
import { NewTask } from './_components/task/new-task'
import { TaskList } from './_components/task/task-list'
import { WelcomeText } from './_components/welcome-text'
import { formatDueDate } from './_utils/formatDueDate'

export default function Page() {
  const [tasksByDueDate, setTasksByDueDate] = useState<Record<string, Task[]>>(
    {},
  )
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks({}),
    staleTime: 10 * (60 * 1000), // 10 mins
  })

  useEffect(() => {
    if (tasks) {
      const formattedTasksByDueDate: Record<string, Task[]> = {}

      tasks.forEach((task) => {
        let dueDateString: string
        if (typeof task.dueDate === 'string') {
          const dueDate = new Date(task.dueDate)
          dueDateString = dueDate.toISOString().split('T')[0]
        } else {
          dueDateString = 'No deadline'
        }

        formattedTasksByDueDate[dueDateString] =
          formattedTasksByDueDate[dueDateString] || []
        formattedTasksByDueDate[dueDateString].push(task)
      })

      setTasksByDueDate(formattedTasksByDueDate)
    }
  }, [tasks])

  function renderListIcon(dueDate: string) {
    if (dueDate === 'No deadline') {
      return CalendarOff
    }

    switch (formatDueDate(dueDate)) {
      case 'Tomorrow':
        return Sunrise
      case 'Today':
        return Calendar
      default:
        return CalendarDays
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <WelcomeText />
      <div className="mb-[-16px]">
        <PhraseOfTheDay />
      </div>
      <div className="top-0 z-50 bg-background pt-4 lg:sticky">
        <NewTask />
      </div>
      <div className="grid gap-6">
        {Object.entries(tasksByDueDate).map(([dueDate, tasks]) => (
          <div key={dueDate}>
            <TaskList
              listName={
                dueDate === 'No deadline'
                  ? 'No deadline'
                  : formatDueDate(dueDate)
              }
              listIcon={renderListIcon(dueDate)}
              listDescription={
                dueDate === 'No deadline'
                  ? ''
                  : `All things to-do on ${formatDueDate(dueDate).toLocaleLowerCase()}`
              }
              defaultOpen
              tasks={tasks}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
