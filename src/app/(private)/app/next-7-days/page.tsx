'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getTasks } from '@/services/api/routes'
import { Task } from '@/services/types'

import { TaskList } from '../_components/task/task-list'
import { formatDueDate } from '../_utils/formatDueDate'
import { renderListIcon } from '../_utils/renderListIcon'

export default function Next7Days() {
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
          dueDateString = 'No deadline'
        }

        formattedTasksByDueDate[dueDateString] =
          formattedTasksByDueDate[dueDateString] || []
        formattedTasksByDueDate[dueDateString].push(task)
      })

      setTasksByDueDate(formattedTasksByDueDate)
    }
  }, [tasks])

  return (
    <main>
      <div className="mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold">Next 7 days</h1>
        <span className="text-sm text-muted-foreground">
          Tasks for the next 7 days.
        </span>
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
    </main>
  )
}
