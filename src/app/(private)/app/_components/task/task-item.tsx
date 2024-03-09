'use client'

import { Eye } from 'lucide-react'
import { useState } from 'react'

import { Icons } from '@/components/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent'

type Props = {
  task: string
  description?: string
  priority?: Priority
}

type PriorityComponentProps = {
  priority: Priority
  children: React.ReactNode
}

const PriorityComponent = ({ priority, children }: PriorityComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="text" size="text">
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{priority} priority</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const priorityMap = {
  none: {
    text: 'No priority',
    icon: (
      <PriorityComponent priority="none">
        <Icons.priority0 className="h-4 w-4" />
      </PriorityComponent>
    ),
  },
  low: {
    text: 'Low',
    icon: (
      <PriorityComponent priority="low">
        <Icons.priority1 className="h-4 w-4" />
      </PriorityComponent>
    ),
  },
  medium: {
    text: 'Medium',
    icon: (
      <PriorityComponent priority="medium">
        <Icons.priority2 className="h-4 w-4" />
      </PriorityComponent>
    ),
  },
  high: {
    text: 'High',
    icon: (
      <PriorityComponent priority="high">
        <Icons.priority3 className="h-4 w-4" />
      </PriorityComponent>
    ),
  },
  urgent: {
    text: 'Urgent',
    icon: (
      <PriorityComponent priority="urgent">
        <Icons.priorityUrgent className="h-4 w-4" />
      </PriorityComponent>
    ),
  },
}

export function TaskItem({ task, description, priority }: Props) {
  const [isCompleted, setIsCompleted] = useState<boolean | 'indeterminate'>(
    false,
  )

  return (
    <div className="grid w-full items-center justify-between gap-4 rounded-md p-4 px-0 lg:flex lg:px-5">
      <div className="items-top flex space-x-3">
        <Checkbox
          id="terms1"
          checked={isCompleted}
          className="h-4 w-4"
          onCheckedChange={(checked) => setIsCompleted(checked)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              isCompleted && 'text-muted-foreground line-through opacity-50',
            )}
          >
            {task}
          </label>
          {description && (
            <p
              className={cn(
                'text-sm text-muted-foreground',
                isCompleted && 'text-muted-foreground line-through opacity-50',
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {priorityMap[priority || 'none'].icon}
        <Badge variant="secondary">{new Date().toLocaleDateString()}</Badge>
        <Badge className="bg-purple-400">Work</Badge>

        <Button size="text" variant="text">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
