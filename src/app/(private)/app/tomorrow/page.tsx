'use client'

import { useQuery } from '@tanstack/react-query'

import { getTasks } from '@/services/api/routes'

import { TaskItem } from '../_components/task/task-item'

export default function Completed() {
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks({}),
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
