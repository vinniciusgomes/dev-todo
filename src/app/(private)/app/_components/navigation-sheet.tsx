'use client'

import { format } from 'date-fns'
import {
  Calendar,
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
import { TooltipProvider } from '@/components/ui/tooltip'
import { Tag, Task } from '@/types'

import { SidebarNavItem } from './sidebar/sidebar-nav-item'
import { SidebarTag } from './sidebar/sidebar-tag'

type Props = {
  tasks: Task[]
  tags: Tag[]
}

export function NavigationSheet({ tasks, tags }: Props) {
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
                  <span className="text-sm">Create new tag</span>
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
    </TooltipProvider>
  )
}
