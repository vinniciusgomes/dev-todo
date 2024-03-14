'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  Calendar,
  CalendarDays,
  CheckSquare,
  GalleryVerticalEnd,
  Plus,
  Settings,
  Sunrise,
  Trash2,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { getTags, getTasks } from '@/services/api/routes'

import { SidebarNavItem } from './sidebar/sidebar-nav-item'
import { SidebarTag } from './sidebar/sidebar-tag'

export function NavigationSheet() {
  const { push } = useRouter()
  const pathname = usePathname()

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks({}),
  })

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: Infinity,
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
    tasks?.filter((task) => task.completed && !task.deleted).length || 0

  const trashTasksCount = tasks?.filter((task) => task.deleted).length || 0

  return (
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle className="text-left">DevToDo</SheetTitle>
      </SheetHeader>
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
            {tags?.map((tag) => (
              <SidebarTag
                key={tag.id}
                label={tag.name}
                onClick={() =>
                  push(
                    `/app/${tag.name.replaceAll(' ', '-').toLocaleLowerCase()}`,
                  )
                }
                active={
                  pathname ===
                  `/app/${tag.name.replaceAll(' ', '-').toLocaleLowerCase()}`
                }
                count={tag.tasks?.length || 0}
                color={tag.color}
              />
            ))}

            <li>
              <Button
                className="mt-4 flex w-full items-center justify-start gap-2 px-2"
                variant="ghost"
                onClick={() => push('/settings/tags')}
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm ">Create new tag</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <SheetFooter className="absolute bottom-6">
        <Button
          variant="text"
          size="text"
          className="flex gap-2"
          onClick={() => push('/settings')}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}