'use client'

import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { updateTask } from '@/actions/task/actions'
import { Icons } from '@/components/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Task } from '@/types'

import { TaskDetails } from './task-details'

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
  const [completed, setCompleted] = useState(task.completed)
  const router = useRouter()

  const handleUpdateTask = async () => {
    setCompleted(!task.completed)

    await updateTask({
      id: task.id,
      title: task.title,
      priority: task.priority ?? undefined,
      dueDate: task.dueDate,
      completed: !task.completed,
      deleted: task.deleted,
    })

    toast({
      title: 'Task updated',
      description: 'Your task has been updated.',
    })

    router.refresh()
  }

  return (
    <Sheet>
      <div className="grid w-full items-center justify-between gap-4 rounded-md p-4 px-0 lg:flex lg:px-5">
        <div className="items-top flex space-x-3">
          <Checkbox
            id="terms1"
            checked={completed}
            className="h-4 w-4"
            onCheckedChange={handleUpdateTask}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                completed && 'text-muted-foreground line-through opacity-50',
              )}
            >
              {task.title}
            </label>
            {task.description && (
              <p
                className={cn(
                  'max-w-[700px] truncate text-sm text-muted-foreground',
                  completed && 'text-muted-foreground line-through opacity-50',
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

          <SheetTrigger asChild>
            <Button size="text" variant="text">
              <Eye className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </div>
      </div>

      <TaskDetails task={task} />
    </Sheet>
  )
}
