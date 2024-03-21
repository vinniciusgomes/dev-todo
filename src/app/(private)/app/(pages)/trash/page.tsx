import { getTasks } from '@/actions/task/actions'
import { TaskItem } from '@/app/(private)/app/_components/task/task-item'

export default async function Trash() {
  const tasks = await getTasks({
    deleted: true,
  })

  return (
    <main>
      <div className="mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold">Trash</h1>
        <span className="text-sm text-muted-foreground">
          All deleted tasks.
        </span>
      </div>

      <div className="mt-10">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
