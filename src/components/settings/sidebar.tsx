'use client'

import {
  BellDot,
  ChevronLeft,
  CreditCard,
  DollarSign,
  Fingerprint,
  GalleryVerticalEnd,
  Settings2,
  Tag,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { SidebarNavItem } from './sidebar-nav-item'

export function Sidebar() {
  const { push } = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return path === pathname
  }

  return (
    <aside className="hidden w-full max-w-[280px] flex-col justify-between border-r px-6 py-6 lg:flex">
      <div>
        <div>
          <Link href="/app" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-8">
          <div>
            <h3 className="text-md font-semibold">Geral</h3>
            <ul className="mt-2 space-y-1">
              <SidebarNavItem
                label="Lists"
                onClick={() => push('/settings/lists')}
                active={isActive('/settings/lists')}
                icon={GalleryVerticalEnd}
              />
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
      </div>
    </aside>
  )
}
