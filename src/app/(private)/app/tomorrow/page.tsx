'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTasks } from '@/services/api/routes'

import { TaskItem } from '../_components/task/task-item'

export default function Completed() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { data: tasks } = useQuery({
    queryKey: [
      'tasks',
      {
        filter: {
          dueDate: format(tomorrow, 'yyyy-MM-dd'),
        },
      },
    ],
    queryFn: () =>
      getTasks({
        dueDate: format(tomorrow, 'yyyy-MM-dd'),
      }),
  })

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Tomorrow</h1>
        <span className="text-sm text-muted-foreground">
          All tomorrow tasks.
        </span>
      </div>

      <div className="mt-6">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
