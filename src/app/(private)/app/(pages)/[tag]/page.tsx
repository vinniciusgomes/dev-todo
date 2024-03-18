import { redirect } from 'next/navigation'

import { getTags } from '@/actions/tag/actions'
import { getTasks } from '@/actions/task/actions'
import { TaskItem } from '@/app/(private)/app/_components/task/task-item'
import { normalizeTagUrl } from '@/app/(private)/app/_utils/normalizeTagUrl'
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

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{tag.name}</h1>
        <span className="text-sm text-muted-foreground">
          All {tag.name.toLocaleLowerCase()} tasks.
        </span>
      </div>

      <div className="mt-6">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
