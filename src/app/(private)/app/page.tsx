'use client'

import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'
import { getTasks } from '@/services/api/routes'
import { Task } from '@/services/types'

import { PhraseOfTheDay } from './_components/phrase-of-the-day'
import { NewTask } from './_components/task/new-task'
import { TaskList } from './_components/task/task-list'
import { WelcomeText } from './_components/welcome-text'
import { formatDueDate } from './_utils/formatDueDate'
import { renderListIcon } from './_utils/renderListIcon'
import { sortByDate } from './_utils/sortTasksByDate'

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
      const sortedTasks = sortByDate(tasks)
      setTasksByDueDate(sortedTasks)
    }
  }, [tasks])

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

          if (!tasksWithoutCompletedAndDeleted.length) {
            return null
          }

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
                defaultOpen
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
