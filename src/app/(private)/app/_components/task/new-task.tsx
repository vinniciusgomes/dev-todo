'use client'

import axios from 'axios'
import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const taskFormSchema = z.object({
  title: z.string().min(1, { message: 'Please enter a task name.' }),
  date: z.date(),
  priority: z.enum(['none', 'low', 'medium', 'high', 'urgent'], {
    invalid_type_error: 'Please select a priority.',
  }),
  description: z.string().optional(),
})

type TaskForm = z.infer<typeof taskFormSchema>

export function NewTask() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<TaskForm>({
    defaultValues: {
      priority: 'none',
    },
  })

  const onSubmit = async (data: TaskForm) => {
    setLoading(true)

    if (!data.title) {
      setLoading(false)
      return toast({
        title: 'Invalid title',
        description: 'Please enter a task name.',
      })
    }

    try {
      await axios.post('/api/task', data)
      form.reset()

      toast({
        title: 'Task created',
        description: 'Your task has been created.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
      })
    } finally {
      setLoading(false)
    }
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
            name="date"
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
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
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
          <Button
            className="w-full lg:w-[130px]"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Create task
          </Button>
        </div>
      </form>
    </Form>
  )
}
