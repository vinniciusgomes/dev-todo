'use client'

import {
  Calendar,
  CalendarDays,
  CheckSquare,
  GalleryVerticalEnd,
  Plus,
  Sunrise,
  Trash2,
} from 'lucide-react'
import { Session } from 'next-auth'

import { Icons } from '@/components/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { SettingsMenu } from './settings-menu'

type Props = {
  user: Session['user']
}

export function Navbar({ user }: Props) {
  if (!user) return

  return (
    <div className="hidden w-full max-w-[300px] flex-col justify-between border-r px-6 py-6 lg:flex">
      <div>
        <div className="flex items-center justify-between">
          <Icons.appIcon className="h-12 w-12" />
          <div className="flex w-full items-center">
            <div className="ml-4 grid gap-0">
              <span className="text-sm font-semibold text-primary">
                Vinnicius Gomes
              </span>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          <div>
            <h3 className="text-lg font-semibold">List</h3>

            <ul className="mt-2 space-y-1">
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <GalleryVerticalEnd className="h-4 w-4 text-muted-foreground" />

                    <span className="text-sm">All</span>
                  </div>
                  <Badge variant="outline">24</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Today</span>
                  </div>
                  <Badge variant="outline">13</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <Sunrise className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Tomorrow</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Next 7 days</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Trash</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Tags</h3>

            <ul className="mt-2 space-y-1">
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="text-sm">Personal</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-400" />
                    <span className="text-sm">Work</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="flex w-full items-center justify-between px-2"
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    <span className="text-sm">Family</span>
                  </div>
                  <Badge variant="outline">11</Badge>
                </Button>
              </li>
              <li>
                <Button
                  className="mt-4 flex w-full items-center justify-start gap-2 px-2"
                  variant="ghost"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm ">Create new tag</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SettingsMenu />
    </div>
  )
}
