'use client'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getTags } from '@/actions/tag/actions'
import { createTask } from '@/actions/task/actions'
import { Icons } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
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
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Tag } from '@/types'

const taskFormSchema = z.object({
  title: z.string().min(1, { message: 'Please enter a task name.' }),
  dueDate: z.string().optional(),
  priority: z.enum(['none', 'low', 'medium', 'high', 'urgent'], {
    invalid_type_error: 'Please select a priority.',
  }),
  tagId: z.string().optional(),
})

type TaskForm = z.infer<typeof taskFormSchema>

export function NewTask() {
  const router = useRouter()
  const [tags, setTags] = useState<Tag[]>([])
  const { toast } = useToast()
  const form = useForm<TaskForm>({
    defaultValues: {
      priority: 'none',
    },
  })

  const handleGetTags = async () => {
    const tags = await getTags()

    setTags(tags)
  }

  useEffect(() => {
    handleGetTags()
  }, [])

  const onSubmit = async (data: TaskForm) => {
    const selectedTag = tags.find((tag) => tag.id === data.tagId)

    if (!data.title) {
      return toast({
        title: 'Invalid title',
        description: 'Please enter a task name.',
      })
    }

    if (!data.dueDate) {
      return toast({
        title: 'Invalid due date',
        description: 'Please enter a due date.',
      })
    }

    await createTask({
      priority: data.priority,
      title: data.title,
      dueDate: data.dueDate && format(new Date(data.dueDate), 'yyyy-MM-dd'),
      tagId: selectedTag?.id,
    })

    form.reset()
    router.refresh()

    toast({
      title: 'Task created successfully',
      description: 'Your task has been created.',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-2 rounded-md border-2 border-dashed bg-background px-3 py-3 lg:flex">
          <Input
            className="flex-1"
            placeholder="Task name..."
            {...form.register('title')}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal lg:w-[240px]',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const yesterday = new Date()
                        yesterday.setDate(yesterday.getDate() - 1)
                        return date < yesterday
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full lg:w-[180px]">
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full lg:w-[180px]">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                  </FormControl>
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
              </FormItem>
            )}
          />

          <Button className="w-full lg:w-[130px]" type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Create task
          </Button>
        </div>
      </form>
    </Form>
  )
}
