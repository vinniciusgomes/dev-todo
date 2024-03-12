'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  font: z.enum(['inter'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
  fontSize: z.enum(['smaller', 'small', 'default', 'large', 'larger'], {
    invalid_type_error: 'Select a font size',
    required_error: 'Please select a font size.',
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export default function Preferences() {
  const { setTheme, theme } = useTheme()

  const defaultValues: Partial<AppearanceFormValues> = {
    theme: theme === 'dark' ? 'dark' : 'light',
    font: 'inter',
    fontSize: 'default',
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)
  }

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl">Preferences</h1>
        <span className="text-sm text-muted-foreground">
          Manage your preferences
        </span>
      </div>
      <Separator />

      <div>
        <h3 className="mb-4 text-sm font-medium">Display</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="font"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Font</FormLabel>
                    <FormDescription>
                      Set the font you want to use.
                    </FormDescription>
                    <FormMessage />
                  </div>
                  <div className="relative w-max">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: 'outline' }),
                          'w-[100px] appearance-none font-normal',
                        )}
                        {...field}
                      >
                        <option value="inter">Inter</option>
                      </select>
                    </FormControl>
                    <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="fontSize"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Font size</FormLabel>
                    <FormDescription>Adjust your font size.</FormDescription>
                    <FormMessage />
                  </div>
                  <div className="relative w-max">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: 'outline' }),
                          'w-[100px] appearance-none font-normal',
                        )}
                        {...field}
                      >
                        <option value="smaller">Smaller</option>
                        <option value="small">Small</option>
                        <option value="default">Default</option>
                        <option value="large">Large</option>
                        <option value="larger">Larger</option>
                      </select>
                    </FormControl>
                    <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Theme</FormLabel>
                  <FormDescription>
                    Select the theme for the dashboard.
                  </FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-md grid-cols-2 gap-8 pt-2"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <div
                          className="cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent"
                          onClick={() => setTheme('light')}
                        >
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Light
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <div
                          className="cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setTheme('dark')}
                        >
                          <div className="space-y-2 rounded-sm bg-zinc-950 p-2">
                            <div className="space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-zinc-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-zinc-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-zinc-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Dark
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />

            <Button type="submit">Update preferences</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
