'use client'

import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { Eye } from 'lucide-react'
import React, { useState } from 'react'

import { Icons } from '@/components/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Task } from '@/types'

type Props = {
  task: Task
}

const priorityMap = {
  none: { text: 'No priority', icon: <Icons.priority0 className="h-4 w-4" /> },
  low: { text: 'Low', icon: <Icons.priority1 className="h-4 w-4" /> },
  medium: { text: 'Medium', icon: <Icons.priority2 className="h-4 w-4" /> },
  high: { text: 'High', icon: <Icons.priority3 className="h-4 w-4" /> },
  urgent: {
    text: 'Urgent',
    icon: <Icons.priorityUrgent className="h-4 w-4" />,
  },
}

export function TaskItem({ task }: Props) {
  const [isCompleted, setIsCompleted] = useState<boolean | 'indeterminate'>(
    !!task.completed,
  )

  const handleUpdateTask = async () => {
    console.log('update')
  }

  return (
    <div className="grid w-full items-center justify-between gap-4 rounded-md p-4 px-0 lg:flex lg:px-5">
      <div className="items-top flex space-x-3">
        <Checkbox
          id="terms1"
          checked={isCompleted}
          className="h-4 w-4"
          onCheckedChange={(checked) => {
            setIsCompleted(checked)
            if (task.id) {
              handleUpdateTask()
            }
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              isCompleted && 'text-muted-foreground line-through opacity-50',
            )}
          >
            {task.title}
          </label>
          {task.description && (
            <p
              className={cn(
                'max-w-[700px] truncate text-sm text-muted-foreground',
                isCompleted && 'text-muted-foreground line-through opacity-50',
              )}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {priorityMap[task.priority || 'none'].icon}

        {task.dueDate && (
          <Badge variant="secondary">
            {format(utcToZonedTime(task.dueDate, 'UTC'), 'dd MMM yyyy')}
          </Badge>
        )}
        {task.tag?.id && (
          <Badge
            className={cn(
              'shadow-none',
              task.tag.color,
              `hover:${task.tag.color}`,
            )}
          >
            {task.tag?.name}
          </Badge>
        )}

        <Button size="text" variant="text">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
