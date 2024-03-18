'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createTag } from '@/actions/tag/actions'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const tailwindColorList = [
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Amber', value: 'bg-amber-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Lime', value: 'bg-lime-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Emerald', value: 'bg-emerald-500' },
  { name: 'Teal', value: 'bg-teal-500' },
  { name: 'Cyan', value: 'bg-cyan-500' },
  { name: 'Sky', value: 'bg-sky-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Violet', value: 'bg-violet-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Fuchsia', value: 'bg-fuchsia-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Rose', value: 'bg-rose-500' },
  { name: 'Grey', value: 'bg-zinc-500' },
  { name: 'Black', value: 'bg-black' },
]

const tagFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a tag name.' }),
  color: z.string().min(1, { message: 'Please select a color.' }),
})

type TagForm = z.infer<typeof tagFormSchema>

export function CreateTagDialog() {
  const form = useForm<TagForm>()
  const router = useRouter()

  const onSubmit = async (data: TagForm) => {
    await createTag(data)
    router.refresh()
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create tag</DialogTitle>
        <DialogDescription>
          Create a new tag to organize and filter issues in your todo list.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tag name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                placeholder="Tag name"
                {...form.register('name')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Color
              </Label>

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[277px]">
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Colors</SelectLabel>
                          {tailwindColorList.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${color.value}`}
                                />
                                <span className="ml-2">{color.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
