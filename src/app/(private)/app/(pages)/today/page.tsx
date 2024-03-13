'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTasks } from '@/services/api/routes'

import { TaskItem } from '../../_components/task/task-item'

export default function Today() {
  const { data: tasks } = useQuery({
    queryKey: [
      'tasks',
      {
        filter: {
          dueDate: format(new Date(), 'yyyy-MM-dd'),
        },
      },
    ],
    queryFn: () =>
      getTasks({
        dueDate: format(new Date(), 'yyyy-MM-dd'),
      }),
    staleTime: 10 * (60 * 1000), // 10 mins
  })

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Today</h1>
        <span className="text-sm text-muted-foreground">All today tasks.</span>
      </div>

      <div className="mt-6">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
