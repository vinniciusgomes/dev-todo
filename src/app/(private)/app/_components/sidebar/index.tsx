'use client'

import { format } from 'date-fns'
import {
  Calendar,
  CheckSquare,
  ChevronsLeft,
  ChevronsRight,
  GalleryVerticalEnd,
  Plus,
  Sunrise,
  Trash2,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { useState } from 'react'

import { normalizeTagUrl } from '@/app/(private)/app/_utils/normalizeTagUrl'
import { Icons } from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Tag, Task } from '@/types'

import { SettingsMenu } from './settings-menu'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarTag } from './sidebar-tag'

type Props = {
  user: Session['user']
  tasks: Task[]
  tags: Tag[]
}

export function Sidebar({ user, tags, tasks }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const { push } = useRouter()
  const pathname = usePathname()

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

  const allTasksCount =
    tasks?.filter((task) => !task.deleted && !task.completed).length || 0

  const completedTasksCount =
    tasks?.filter((task) => task.completed && !task.deleted).length || 0

  const trashTasksCount = tasks?.filter((task) => task.deleted).length || 0

  return (
    <TooltipProvider>
      <aside
        data-collapsed={collapsed}
        className="hidden w-full max-w-[280px] flex-col justify-between border-r px-6 py-6 data-[collapsed=true]:max-w-max lg:flex"
      >
        <div>
          <div className="flex items-center justify-between">
            <Icons.appIcon
              className={cn('h-12 w-12', collapsed && 'mx-auto h-10 w-10')}
            />

            {!collapsed && (
              <div className="flex w-full items-center">
                <div className="ml-4 grid gap-0">
                  <span className="text-sm font-semibold text-primary">
                    {user?.name}
                  </span>

                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <p className="truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user?.email}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}
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
                  collapsed={collapsed}
                />
                <SidebarNavItem
                  label="Today"
                  onClick={() => push('/app/today')}
                  count={todayTasksCount}
                  active={pathname === '/app/today'}
                  icon={Calendar}
                  collapsed={collapsed}
                />
                <SidebarNavItem
                  label="Tomorrow"
                  onClick={() => push('/app/tomorrow')}
                  count={tomorrowTasksCount}
                  active={pathname === '/app/tomorrow'}
                  icon={Sunrise}
                  collapsed={collapsed}
                />
                <SidebarNavItem
                  label="Completed"
                  onClick={() => push('/app/completed')}
                  count={completedTasksCount}
                  active={pathname === '/app/completed'}
                  icon={CheckSquare}
                  collapsed={collapsed}
                />
                <SidebarNavItem
                  label="Trash"
                  onClick={() => push('/app/trash')}
                  count={trashTasksCount}
                  active={pathname === '/app/trash'}
                  icon={Trash2}
                  collapsed={collapsed}
                />
              </ul>
            </div>

            <div>
              <h3
                className={cn(
                  'text-lg font-semibold',
                  collapsed && 'text-center text-sm',
                )}
              >
                Tags
              </h3>

              <ul className="mt-2 space-y-1">
                {tags?.map((tag) => (
                  <SidebarTag
                    key={tag.id}
                    label={tag.name}
                    onClick={() => push(`/app/${normalizeTagUrl(tag.name)}`)}
                    active={pathname === `/app/${normalizeTagUrl(tag.name)}`}
                    count={tag.tasks?.length || 0}
                    color={tag.color}
                    collapsed={collapsed}
                  />
                ))}

                <li>
                  <Button
                    className="mt-4 flex w-full items-center justify-start gap-2"
                    variant="ghost"
                    onClick={() => push('/settings/tags')}
                  >
                    <Plus className="h-4 w-4" />
                    {collapsed ? (
                      <span className="sr-only">Create new tag</span>
                    ) : (
                      <span className="text-sm ">Create new tag</span>
                    )}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'flex items-center justify-between',
            collapsed && 'flex-col-reverse gap-2',
          )}
        >
          <SettingsMenu collapsed={collapsed} />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
