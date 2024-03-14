'use client'

import { useQuery } from '@tanstack/react-query'
import { Calendar, CalendarDays, CalendarOff, Sunrise } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'
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
          dueDateString = 'No date'
        }

        formattedTasksByDueDate[dueDateString] =
          formattedTasksByDueDate[dueDateString] || []
        formattedTasksByDueDate[dueDateString].push(task)
      })

      setTasksByDueDate(formattedTasksByDueDate)
    }
  }, [tasks])

  function renderListIcon(dueDate: string) {
    if (dueDate === 'No date') {
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
        {Object.entries(tasksByDueDate).map(([dueDate, tasks], index) => {
          const tasksWithoutCompletedAndDeleted = tasks.filter(
            (task) => !task.completed && !task.deleted,
          )

          return (
            <div key={dueDate}>
              <TaskList
                listName={
                  dueDate === 'No date' ? 'No date' : formatDueDate(dueDate)
                }
                listIcon={renderListIcon(dueDate)}
                listDescription={
                  dueDate === 'No date'
                    ? ''
                    : `All things to-do on ${formatDueDate(dueDate).toLocaleLowerCase()}`
                }
                defaultOpen={index === 0}
                tasks={tasksWithoutCompletedAndDeleted}
              />

              {index !== Object.keys(tasksByDueDate).length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
