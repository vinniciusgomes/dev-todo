import { getTasks } from '@/actions/task/actions'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/services/auth'

import { PhraseOfTheDay } from './_components/phrase-of-the-day'
import { NewTask } from './_components/task/new-task'
import { TaskList } from './_components/task/task-list'
import { WelcomeText } from './_components/welcome-text'
import { formatDueDate } from './_utils/formatDueDate'
import { sortByDate } from './_utils/sortTasks'

export default async function Page() {
  const session = await auth()
  const tasks = await getTasks({})
  const sortedTasks = sortByDate(tasks)

  return (
    <div className="flex w-full flex-col gap-10">
      <WelcomeText userName={session?.user?.name || ''} />
      <div className="mb-[-16px]">
        <PhraseOfTheDay />
      </div>
      <div className="top-0 z-50 bg-background pt-4 lg:sticky">
        <NewTask />
      </div>
      <div className="grid gap-6">
        {Object.entries(sortedTasks).map(([dueDate, tasks], index) => {
          const tasksWithoutCompletedAndDeleted = tasks.filter(
            (task) => !task.completed && !task.deleted,
          )

          if (!tasksWithoutCompletedAndDeleted.length) {
            return null
          }

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
                tasks={tasksWithoutCompletedAndDeleted}
              />

              {index !== Object.keys(sortedTasks).length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
