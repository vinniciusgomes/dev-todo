'use client'

import { Eye, Pen, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { deleteTag } from '@/actions/tag/actions'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Tag } from '@/types'

type Props = {
  tag: Tag
}

export function TagItem({ tag }: Props) {
  const router = useRouter()

  const handleDeleteTag = async (id: string) => {
    try {
      await deleteTag({ id })

      toast({
        title: 'Deletion Successful',
        description: 'The todo item has been successfully deleted.',
      })

      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Card
      className="flex items-center justify-between rounded-sm border-border px-4 py-2 shadow-none"
      key={tag.id}
    >
      <div className="flex items-center gap-2">
        <span className={cn('h-2 w-2 rounded-full', tag.color)} />
        <span className="text-sm">{tag.name}</span>
      </div>

      <div className="flex items-center gap-4">
        <Eye
          className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
          onClick={() =>
            router.push(
              `/app/${tag.name.replaceAll(' ', '-').toLocaleLowerCase()}`,
            )
          }
        />
        <Pen className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
        <Trash
          className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
          onClick={() => handleDeleteTag(tag.id)}
        />
      </div>
    </Card>
  )
}
