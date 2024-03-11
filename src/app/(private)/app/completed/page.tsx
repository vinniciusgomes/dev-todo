'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getTasks } from '@/services/api/routes'
import { Task } from '@/services/types'

import { TaskList } from '../_components/task/task-list'
import { formatDueDate } from '../_utils/formatDueDate'
import { renderListIcon } from '../_utils/renderListIcon'

export default function Completed() {
  const [tasksByDueDate, setTasksByDueDate] = useState<Record<string, Task[]>>(
    {},
  )

  const { data: tasks } = useQuery({
    queryKey: [
      'tasks',
      {
        filter: {
          completed: true,
        },
      },
    ],
    queryFn: () =>
      getTasks({
        completed: true,
      }),
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
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Completed</h1>
        <span className="text-sm text-muted-foreground">
          All completed tasks.
        </span>
      </div>

      <div className="mt-10 grid gap-6">
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
                  : `All completed tasks ${formatDueDate(dueDate).toLocaleLowerCase()}`
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
