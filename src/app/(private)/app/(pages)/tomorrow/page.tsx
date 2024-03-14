'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTasks } from '@/services/api/routes'

import { NewTask } from '../../_components/task/new-task'
import { TaskItem } from '../../_components/task/task-item'

export default function Completed() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { data: tasks } = useQuery({
    queryKey: [
      'tasks',
      {
        filter: {
          dueDate: format(tomorrow, 'yyyy-MM-dd'),
          completed: false,
        },
      },
    ],
    queryFn: () =>
      getTasks({
        dueDate: format(tomorrow, 'yyyy-MM-dd'),
        completed: false,
      }),
  })

  return (
    <main>
      <div className="mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold">Tomorrow</h1>
        <span className="text-sm text-muted-foreground">
          All tomorrow tasks.
        </span>
      </div>

      <NewTask />

      <div className="mt-10">
        {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </div>
    </main>
  )
}
