import { getTasks } from '@/actions/task/actions'
import { NewTask } from '@/app/(private)/app/_components/task/new-task'
import { TaskItem } from '@/app/(private)/app/_components/task/task-item'

export default async function Page() {
  const tasks = await getTasks({
    completed: true,
    deleted: false,
  })

  return (
    <main>
      <div className="mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold">Completed</h1>
        <span className="text-sm text-muted-foreground">
          All completed tasks.
        </span>
      </div>

      <NewTask />

      <div className="mt-10">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
