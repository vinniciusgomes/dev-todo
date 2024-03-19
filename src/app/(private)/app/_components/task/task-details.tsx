import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getTags } from '@/actions/tag/actions'
import { updateTask } from '@/actions/task/actions'
import { Icons } from '@/components/icon'
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
import { SheetContent, SheetFooter } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Tag, Task } from '@/types'

type Props = {
  task: Task
}

type UpdateTaskBody = {
  completed?: boolean
  deleted?: boolean
  id?: string
  title?: string
  priority?: 'none' | 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
}

export function TaskDetails({ task }: Props) {
  const [tags, setTags] = useState<Tag[]>([])
  const router = useRouter()

  const handleGetTags = async () => {
    const tags = await getTags()

    setTags(tags)
  }

  useEffect(() => {
    handleGetTags()
  }, [])

  const handleUpdateTask = async ({ ...data }: UpdateTaskBody) => {
    await updateTask({
      ...data,
      id: task.id,
    })

    toast({
      title: 'Task updated',
      description: 'Your task has been updated.',
    })

    router.refresh()
  }

  if (!task.id) {
    return null
  }

  return (
    <SheetContent className="flex flex-col justify-between border-l px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="items-top flex space-x-3">
          <Checkbox
            id="terms1"
            checked={task.completed}
            className="h-4 w-4"
            onCheckedChange={(checked) =>
              handleUpdateTask({
                completed: checked === true,
                deleted: task.deleted,
                id: task.id,
                title: task.title,
                priority: task.priority ?? undefined,
                dueDate: task.dueDate,
              })
            }
          />
          <Input
            className={cn(
              'h-max border-none p-0 text-sm font-medium leading-none shadow-none focus:ring-0 focus:ring-offset-0 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              task.completed && 'text-muted-foreground line-through opacity-50',
            )}
            value={task.title}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex h-9 items-center justify-between">
            <span className="text-sm text-muted-foreground">Priority</span>
            <Select defaultValue="none" value={task.priority ?? undefined}>
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
            <span className="text-sm text-muted-foreground">Tag</span>
            <Select value={task.tag?.id ?? undefined}>
              <SelectTrigger className="w-max border-none p-0 shadow-none outline-none focus:ring-0">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tag</SelectLabel>
                  {tags?.map((tag) => (
                    <SelectItem value={tag.id ?? 'none'} key={tag.id}>
                      <div className="flex items-center gap-1.5">
                        <div
                          className={cn('h-2 w-2 rounded-full', tag.color)}
                        />
                        {tag.name}
                      </div>
                    </SelectItem>
                  ))}
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
                  {task.dueDate ? (
                    format(new Date(task.dueDate), 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(task.dueDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Textarea placeholder="Write a note..." rows={5} />
        </div>
      </div>

      <SheetFooter>
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              handleUpdateTask({
                deleted: !task.deleted,
              })
            }
          >
            {task.deleted ? 'Restore' : 'Delete'} task
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}
