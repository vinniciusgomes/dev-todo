import { format } from 'date-fns'

import { getTasks } from '@/actions/task/actions'
import { NewTask } from '@/app/(private)/app/_components/task/new-task'
import { TaskItem } from '@/app/(private)/app/_components/task/task-item'

export default async function Today() {
  const tasks = await getTasks({
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    completed: false,
    deleted: false,
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
