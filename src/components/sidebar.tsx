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
import { Button } from '@/components/ui/button'

import { SettingsMenu } from './settings-menu'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarTag } from './sidebar-tag'

type Props = {
  user: Session['user']
}

export function Sidebar({ user }: Props) {
  if (!user) return

  return (
    <aside className="hidden w-full max-w-[280px] flex-col justify-between border-r px-6 py-6 lg:flex">
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
            <ul className="mt-2 space-y-1">
              <SidebarNavItem
                label="All"
                onClick={() => {}}
                active
                count={11}
                icon={GalleryVerticalEnd}
              />
              <SidebarNavItem
                label="Today"
                onClick={() => {}}
                count={13}
                icon={Calendar}
              />
              <SidebarNavItem
                label="Tomorrow"
                onClick={() => {}}
                count={11}
                icon={Sunrise}
              />
              <SidebarNavItem
                label="Next 7 days"
                onClick={() => {}}
                count={11}
                icon={CalendarDays}
              />
              <SidebarNavItem
                label="Completed"
                onClick={() => {}}
                count={24}
                icon={CheckSquare}
              />
              <SidebarNavItem
                label="Trash"
                onClick={() => {}}
                count={104}
                icon={Trash2}
              />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Tags</h3>

            <ul className="mt-2 space-y-1">
              <SidebarTag
                label="Personal"
                onClick={() => {}}
                count={11}
                color="bg-yellow-400"
              />
              <SidebarTag
                label="Work"
                onClick={() => {}}
                count={11}
                color="bg-purple-400"
              />
              <SidebarTag
                label="Family"
                onClick={() => {}}
                count={11}
                color="bg-blue-400"
              />
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
    </aside>
  )
}
