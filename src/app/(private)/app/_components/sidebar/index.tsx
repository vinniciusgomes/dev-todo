'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  Calendar,
  CalendarDays,
  CheckSquare,
  GalleryVerticalEnd,
  Plus,
  Sunrise,
  Trash2,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'

import { Icons } from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getTasks } from '@/services/api/routes'

import { SettingsMenu } from './settings-menu'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarTag } from './sidebar-tag'

type Props = {
  user: Session['user']
}

export function Sidebar({ user }: Props) {
  const { push } = useRouter()
  const pathname = usePathname()

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks({}),
  })

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const todayTasksCount =
    tasks?.filter(
      (task) =>
        task?.dueDate === format(new Date(), 'yyyy-MM-dd') &&
        !task.completed &&
        !task.deleted,
    ).length || 0

  const tomorrowTasksCount =
    tasks?.filter(
      (task) =>
        task?.dueDate === format(tomorrow, 'yyyy-MM-dd') &&
        !task.completed &&
        !task.deleted,
    ).length || 0

  const nextSevenDaysTasksCount =
    tasks?.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) <=
          new Date(today.setDate(today.getDate() + 7)) &&
        new Date(task.dueDate) >= new Date() &&
        !task.completed &&
        !task.deleted,
    ).length || 0

  const allTasksCount =
    tasks?.filter((task) => !task.deleted && !task.completed).length || 0

  const completedTasksCount =
    tasks?.filter((task) => task.completed).length || 0

  const trashTasksCount = tasks?.filter((task) => task.deleted).length || 0

  return (
    <aside className="hidden w-full max-w-[280px] flex-col justify-between border-r px-6 py-6 lg:flex">
      <div>
        <div className="flex items-center justify-between">
          <Icons.appIcon className="h-12 w-12" />
          <div className="flex w-full items-center">
            <div className="ml-4 grid gap-0">
              <span className="text-sm font-semibold text-primary">
                {user?.name}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user?.email}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          <div>
            <ul className="mt-2 space-y-1">
              <SidebarNavItem
                label="All"
                onClick={() => push('/app')}
                active={pathname === '/app'}
                count={allTasksCount}
                icon={GalleryVerticalEnd}
              />
              <SidebarNavItem
                label="Today"
                onClick={() => push('/app/today')}
                count={todayTasksCount}
                active={pathname === '/app/today'}
                icon={Calendar}
              />
              <SidebarNavItem
                label="Tomorrow"
                onClick={() => push('/app/tomorrow')}
                count={tomorrowTasksCount}
                active={pathname === '/app/tomorrow'}
                icon={Sunrise}
              />
              <SidebarNavItem
                label="Next 7 days"
                onClick={() => push('/app/next-7-days')}
                count={nextSevenDaysTasksCount}
                active={pathname === '/app/next-7-days'}
                icon={CalendarDays}
              />
              <SidebarNavItem
                label="Completed"
                onClick={() => push('/app/completed')}
                count={completedTasksCount}
                active={pathname === '/app/completed'}
                icon={CheckSquare}
              />
              <SidebarNavItem
                label="Trash"
                onClick={() => push('/app/trash')}
                count={trashTasksCount}
                active={pathname === '/app/trash'}
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
