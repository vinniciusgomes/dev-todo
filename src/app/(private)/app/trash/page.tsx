'use client'

import { useQuery } from '@tanstack/react-query'

import { getTasks } from '@/services/api/routes'

import { TaskItem } from '../_components/task/task-item'

export default function Trash() {
  const { data: tasks } = useQuery({
    queryKey: ['tasks', { filter: { deleted: true } }],
    queryFn: () =>
      getTasks({
        deleted: true,
      }),
  })

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Trash</h1>
        <span className="text-sm text-muted-foreground">
          All deleted tasks.
        </span>
      </div>

      <div className="mt-6">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
