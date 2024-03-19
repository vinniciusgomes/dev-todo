'use client'

import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent } from '@/components/ui/tooltip'

type Props = {
  collapsed?: boolean
}

export function SettingsMenu({ collapsed }: Props) {
  const { setTheme } = useTheme()
  const { push } = useRouter()

  return (
    <Tooltip delayDuration={0}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-0 flex gap-2">
              <Settings className="h-4 w-4" />

              {!collapsed && <span>Settings</span>}
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <h4 className="text-sm">Vinnicius Gomes</h4>
            <span className="text-xs font-normal">vinnicius@woney.com.br</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>General</DropdownMenuItem>
            <DropdownMenuItem onClick={() => push('/settings/account')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => push('/settings/plans')}>
              Upgrade
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => push('/settings/account')}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>System</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Links</DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="https://github.com/vinniciusgomes/dev-todo"
              target="_blank"
            >
              GitHub
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="https://devtodo.app/support" target="_blank">
              Support
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {collapsed && (
        <TooltipContent side="right" className="flex items-center">
          <span>Settings</span>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
