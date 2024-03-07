'use client'

import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useState } from 'react'

import { Icons } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export function NewTask() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="grid w-full items-center gap-2 rounded-md border-2 border-dashed bg-background px-3 py-3 lg:flex">
      <Input className="flex-1" placeholder="Task name..." />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal lg:w-[240px]',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select defaultValue="none">
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Select a priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Priority</SelectLabel>
            <SelectItem value="urgent">
              <div className="flex items-center gap-1.5">
                <Icons.priorityUrgent className="h-3 w-3" />
                Urgent
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-1.5">
                <Icons.priority3 className="h-3 w-3" />
                High
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-1.5">
                <Icons.priority2 className="h-3 w-3" />
                Medium
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center gap-1.5">
                <Icons.priority1 className="h-3 w-3" />
                Low
              </div>
            </SelectItem>
            <SelectItem value="none" defaultChecked>
              <div className="flex items-center gap-1.5">
                <Icons.priority0 className="h-3 w-3" />
                No priority
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tag</SelectLabel>
            <SelectItem value="personal">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                Personal
              </div>
            </SelectItem>
            <SelectItem value="work">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                Work
              </div>
            </SelectItem>
            <SelectItem value="family">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                Family
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="w-full lg:w-[130px]">
        Create task
        <Plus className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
