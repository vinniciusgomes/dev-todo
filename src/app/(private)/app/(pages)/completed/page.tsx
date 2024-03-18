import { getTasks } from '@/actions/task/actions'
import { Separator } from '@/components/ui/separator'

import { NewTask } from '../../_components/task/new-task'
import { TaskList } from '../../_components/task/task-list'
import { formatDueDate } from '../../_utils/formatDueDate'
import { sortByDate } from '../../_utils/sortTasks'

export default async function Page() {
  const tasks = await getTasks({
    completed: true,
    deleted: false,
  })

  const sortedTasks = sortByDate(tasks)

  return (
    <main>
      <div className="mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold">Completed</h1>
        <span className="text-sm text-muted-foreground">
          All dompleted tasks.
        </span>
      </div>

      <NewTask />

      <div className="mt-10 grid gap-6">
        {Object.entries(sortedTasks).map(([dueDate, tasks], index) => {
          return (
            <div key={dueDate}>
              <TaskList
                listName={
                  dueDate === 'No date' ? 'No date' : formatDueDate(dueDate)
                }
                listDescription={
                  dueDate === 'No date'
                    ? ''
                    : `All things to-do on ${formatDueDate(dueDate).toLocaleLowerCase()}`
                }
                defaultOpen
                tasks={tasks}
              />

              {index !== Object.keys(sortedTasks).length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
