import { redirect } from 'next/navigation'

import { getTags } from '@/actions/tag/actions'
import { getTasks } from '@/actions/task/actions'
import { TaskList } from '@/app/(private)/app/_components/task/task-list'
import { formatDueDate } from '@/app/(private)/app/_utils/formatDueDate'
import { normalizeTagUrl } from '@/app/(private)/app/_utils/normalizeTagUrl'
import { sortByDate } from '@/app/(private)/app/_utils/sortTasks'
import { Separator } from '@/components/ui/separator'
import { Tag } from '@/types'

export default async function Tag({ params }: { params: { tag: string } }) {
  const allTags = await getTags()

  const tag = allTags.find((tag) => normalizeTagUrl(tag.name) === params.tag)

  if (!tag) {
    return redirect('/app')
  }

  const tasks = await getTasks({
    completed: false,
    deleted: false,
    tagId: tag.id,
  })

  const sortedTasks = sortByDate(tasks)

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{tag.name}</h1>
        <span className="text-sm text-muted-foreground">
          All {tag.name.toLocaleLowerCase()} tasks.
        </span>
      </div>

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
