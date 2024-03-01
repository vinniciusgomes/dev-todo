'use client'

import { ArrowDown, ArrowRight, ArrowUp, Eye } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

type Props = {
  task: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
}

const priorityMap = {
  low: {
    text: 'Low',
    icon: <ArrowDown className="h-3 w-3" />,
  },
  medium: {
    text: 'Medium',
    icon: <ArrowRight className="h-3 w-3" />,
  },
  high: {
    text: 'High',
    icon: <ArrowUp className="h-3 w-3" />,
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
        <Badge variant="outline" className="flex items-center gap-1">
          <span>{priorityMap[priority || 'low'].text}</span>
          {priorityMap[priority || 'low'].icon}
        </Badge>
        <Badge variant="secondary">{new Date().toLocaleDateString()}</Badge>
        <Badge className="bg-purple-400">Work</Badge>

        <Button size="text" variant="text">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
