'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTasks } from '@/services/api/routes'

import { NewTask } from '../../_components/task/new-task'
import { TaskItem } from '../../_components/task/task-item'

export default function Today() {
  const { data: tasks } = useQuery({
    queryKey: [
      'tasks',
      {
        filter: {
          dueDate: format(new Date(), 'yyyy-MM-dd'),
          completed: false,
        },
      },
    ],
    queryFn: () =>
      getTasks({
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        completed: false,
      }),
  })

  return (
    <main>
      <div className="mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold">Today</h1>
        <span className="text-sm text-muted-foreground">All today tasks.</span>
      </div>

      <NewTask />

      <div className="mt-10">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
