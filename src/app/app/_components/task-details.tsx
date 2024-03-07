'use client'

import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useState } from 'react'

import { Icons } from '@/components/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function TaskDetails() {
  const [isCompleted, setIsCompleted] = useState<boolean | 'indeterminate'>(
    false,
  )
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex w-full max-w-[380px] flex-col justify-between border-l px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="items-top flex space-x-3">
          <Checkbox
            id="terms1"
            checked={isCompleted}
            className="h-4 w-4"
            onCheckedChange={(checked) => setIsCompleted(checked)}
          />
          <Input
            className={cn(
              'h-max border-none p-0 text-sm font-medium leading-none shadow-none focus:ring-0 focus:ring-offset-0 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              isCompleted && 'text-muted-foreground line-through opacity-50',
            )}
            value=' Read "The Pragmatic Programmer"'
          />
        </div>

        <div className="grid gap-2">
          <div className="flex h-9 items-center gap-2">
            <Badge className="bg-purple-400">Work</Badge>

            <div className="inline-flex items-center gap-1 rounded-md border border-dashed bg-transparent px-2.5 py-0.5">
              <Plus className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground">
                Add tag
              </span>
            </div>
          </div>
          <div className="flex h-9 items-center justify-between">
            <span className="text-sm text-muted-foreground">Priority</span>
            <Select defaultValue="none">
              <SelectTrigger className="w-max border-none p-0 shadow-none outline-none focus:ring-0">
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
          </div>
          <div className="flex h-9 items-center justify-between">
            <span className="text-sm text-muted-foreground">List</span>
            <Select defaultValue="today">
              <SelectTrigger className="w-max border-none p-0 shadow-none outline-none focus:ring-0">
                <SelectValue placeholder="Select a list" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lists</SelectLabel>
                  <SelectItem value="today">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      <span>Today</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex h-9 items-center justify-between">
            <span className="text-sm text-muted-foreground">Due date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="text"
                  size="text"
                  className="justify-start border-none text-left font-normal shadow-none focus:ring-0"
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
          </div>
          <Textarea placeholder="Write a note..." rows={5} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="ghost">Delete</Button>
      </div>
    </div>
  )
}
