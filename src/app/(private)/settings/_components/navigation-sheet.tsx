'use client'

import {
  Calendar,
  CalendarDays,
  CheckSquare,
  GalleryVerticalEnd,
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

import { SidebarNavItem } from './sidebar-nav-item'

export function NavigationSheet() {
  const { push } = useRouter()
  const pathname = usePathname()

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
              icon={GalleryVerticalEnd}
            />
            <SidebarNavItem
              label="Today"
              onClick={() => push('/app/today')}
              active={pathname === '/app/today'}
              icon={Calendar}
            />
            <SidebarNavItem
              label="Tomorrow"
              onClick={() => push('/app/tomorrow')}
              active={pathname === '/app/tomorrow'}
              icon={Sunrise}
            />
            <SidebarNavItem
              label="Next 7 days"
              onClick={() => push('/app/next-7-days')}
              active={pathname === '/app/next-7-days'}
              icon={CalendarDays}
            />
            <SidebarNavItem
              label="Completed"
              onClick={() => push('/app/completed')}
              active={pathname === '/app/completed'}
              icon={CheckSquare}
            />
            <SidebarNavItem
              label="Trash"
              onClick={() => push('/app/trash')}
              active={pathname === '/app/trash'}
              icon={Trash2}
            />
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
          Sign out
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
