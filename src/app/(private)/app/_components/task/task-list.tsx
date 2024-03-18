'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Task } from '@/types'

import { TaskItem } from './task-item'

type Props = {
  listName: string
  listDescription?: string
  listIcon?: React.ElementType
  defaultOpen?: boolean
  tasks?: Task[]
}

export function TaskList({
  listName,
  listDescription,
  listIcon,
  defaultOpen,
  tasks,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false)
  const Icon = listIcon

  if (!tasks) {
    return null
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2 px-0"
    >
      <div className="flex items-center justify-between space-x-4">
        <div>
          <div className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <h4 className="font-semibold">{listName}</h4>

            <Badge variant="secondary" className="ml-2">
              {tasks.length}
            </Badge>
          </div>
          {listDescription && (
            <p className="text-sm text-muted-foreground">{listDescription}</p>
          )}
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </CollapsibleContent>
    </Collapsible>
  )
}
