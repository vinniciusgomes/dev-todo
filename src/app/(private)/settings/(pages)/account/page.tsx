'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function Account() {
  const [date, setDate] = useState<Date>()

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl">Account</h1>
        <span className="text-sm text-muted-foreground">
          Manage your DevToDo account
        </span>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div>
          <p className="mb-2 text-sm font-medium">Profile picture</p>
          <Avatar className="h-20 w-20 md:h-36 md:w-36">
            <AvatarImage
              src="https://github.com/vinniciusgomes.png"
              alt="@vinniciusgomes"
            />
            <AvatarFallback>VG</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-sm font-medium">Email</p>
          <span className="text-sm text-muted-foreground">
            vinnicius@woney.com.br
          </span>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Full name</p>
          <div>
            <Input className="shadow-none" value="Vinnicius Gomes" />
            <span className="text-[0.8rem] text-muted-foreground">
              This is the name that will be displayed on your profile and in
              emails.
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <p className="text-sm font-medium">Username </p>
            <span className="text-sm text-muted-foreground">—</span>
            <span className="text-sm text-muted-foreground">
              Nickname or first name, however you want to be called in DevToDo
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-muted-foreground">@</span>
            <Input
              placeholder="Your username"
              className="pl-9 shadow-none"
              value="vinniciusgomes"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Date of birth</p>
          <div className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[250px] justify-start text-left font-normal',
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
            <span className="text-[0.8rem] text-muted-foreground">
              Your date of birth is used to calculate your age.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="mt-4 w-max">Update account</Button>
          <Button className="mt-4 w-max text-red-600" variant="outline">
            Delete account
          </Button>
        </div>
      </div>
    </main>
  )
}
