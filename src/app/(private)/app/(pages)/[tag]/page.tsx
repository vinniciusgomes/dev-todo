'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getTags, getTasks } from '@/services/api/routes'
import { Tag } from '@/services/types'

import { TaskItem } from '../../_components/task/task-item'

export default function Tag() {
  const [tag, setTag] = useState<Tag | null>(null)
  const pathname = usePathname()

  const { data: tasks } = useQuery({
    queryKey: [
      'tasks',
      {
        filter: {
          tagId: tag?.id,
        },
      },
    ],
    queryFn: () =>
      getTasks({
        tagId: tag?.id || '',
      }),
  })

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: Infinity,
  })

  useEffect(() => {
    const tagName = pathname?.split('/').pop()

    const tag = tags?.find(
      (tag) => tag.name.replaceAll(' ', '-').toLocaleLowerCase() === tagName,
    )

    if (tag?.id) {
      setTag(tag)
    }
  }, [tags, pathname])

  return (
    <main>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{tag?.name}</h1>
        <span className="text-sm text-muted-foreground">
          All {tag?.name} tasks.
        </span>
      </div>

      <div className="mt-6">
        {tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
      </div>
    </main>
  )
}
