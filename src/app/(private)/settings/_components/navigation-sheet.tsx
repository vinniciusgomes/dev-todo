'use client'

import {
  BellDot,
  ChevronLeft,
  CreditCard,
  DollarSign,
  Fingerprint,
  LogOut,
  Settings2,
  Tag,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { SheetContent, SheetFooter } from '@/components/ui/sheet'

import { SidebarNavItem } from './sidebar-nav-item'

export function NavigationSheet() {
  const { push } = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return path === pathname
  }

  return (
    <SheetContent side="left">
      <div className="mt-[-10px]">
        <Link href="/app" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </div>

      <div className="mt-8 grid gap-8">
        <div>
          <h3 className="text-md font-semibold">General</h3>
          <ul className="mt-2 space-y-1">
            <SidebarNavItem
              label="Tags"
              onClick={() => push('/settings/tags')}
              active={isActive('/settings/tags')}
              icon={Tag}
            />
            <SidebarNavItem
              label="Plans"
              onClick={() => push('/settings/plans')}
              active={isActive('/settings/plans')}
              icon={DollarSign}
            />
            <SidebarNavItem
              label="Billing"
              onClick={() => push('/settings/billing')}
              active={isActive('/settings/billing')}
              icon={CreditCard}
            />
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold">Account</h3>
          <ul className="mt-2 space-y-1">
            <SidebarNavItem
              label="Account"
              onClick={() => push('/settings/account')}
              active={isActive('/settings/account')}
              icon={User}
            />
            <SidebarNavItem
              label="Preferences"
              onClick={() => push('/settings/account/preferences')}
              active={isActive('/settings/account/preferences')}
              icon={Settings2}
            />
            <SidebarNavItem
              label="Notifications"
              onClick={() => push('/settings/account/notifications')}
              active={isActive('/settings/account/notifications')}
              icon={BellDot}
            />
            <SidebarNavItem
              label="Security"
              onClick={() => push('/settings/account/security')}
              active={isActive('/settings/account/security')}
              icon={Fingerprint}
            />
          </ul>
        </div>
      </div>

      <SheetFooter className="absolute bottom-6">
        <Button
          variant="text"
          size="text"
          className="flex gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
