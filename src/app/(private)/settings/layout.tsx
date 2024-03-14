import { Menu } from 'lucide-react'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'

import { NavigationSheet } from './_components/navigation-sheet'
import { SettingsSidebar } from './_components/settings-side-bar'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="flex h-screen w-full">
      <SettingsSidebar />

      <ScrollArea className="no-scrollbar mx-auto h-screen max-w-[800px] flex-1">
        <div className="px-4 py-6 lg:px-8 lg:py-16">
          <div className="mb-6 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="text" size="text">
                  <Menu />
                </Button>
              </SheetTrigger>

              <NavigationSheet />
            </Sheet>
          </div>

          {children}
        </div>
      </ScrollArea>
    </main>
  )
}
