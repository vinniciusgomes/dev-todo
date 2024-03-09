'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { TaskItem } from './task-item'

type Props = {
  listName: string
  listDescription?: string
  listIcon?: React.ElementType
  defaultOpen?: boolean
}

export function TaskList({
  listName,
  listDescription,
  listIcon,
  defaultOpen,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false)
  const Icon = listIcon

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
        <TaskItem
          task='Read "The Pragmatic Programmer"'
          description="Gain insights into software development best practices"
          priority="urgent"
        />
        <TaskItem
          task='Study "Effective Communication"'
          description="Improve communication skills for better collaboration"
          priority="none"
        />
        <TaskItem
          task='Complete "Machine Learning Project"'
          description="Implement algorithms for data analysis"
          priority="high"
        />
        <TaskItem
          task='Practice "Data Structures"'
          description="Solidify understanding of fundamental concepts"
          priority="medium"
        />
        <TaskItem
          task='Review "Object-Oriented Design Principles"'
          description="Apply principles to software architecture"
          priority="low"
        />
        <TaskItem
          task='Research "Blockchain Technology"'
          description="Explore potential applications and implications"
          priority="medium"
        />
        <TaskItem
          task='Write "Technical Blog Post"'
          description="Share insights and experiences with the community"
          priority="high"
        />
        <TaskItem
          task='Attend "Tech Conference"'
          description="Stay updated with the latest industry trends"
          priority="low"
        />
        <TaskItem
          task='Prepare "Presentation"'
          description="Communicate findings and recommendations effectively"
          priority="medium"
        />
        <TaskItem
          task='Read "Clean Code"'
          description="Refactor code for improved readability and maintainability"
          priority="high"
        />
        <TaskItem
          task='Practice "Problem Solving"'
          description="Enhance problem-solving skills through regular exercises"
          priority="low"
        />
      </CollapsibleContent>
    </Collapsible>
  )
}
