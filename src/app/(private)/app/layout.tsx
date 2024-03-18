import { Menu } from 'lucide-react'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { getTags } from '@/actions/tag/actions'
import { getTasks } from '@/actions/task/actions'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { auth } from '@/services/auth'

import { NavigationSheet } from './_components/navigation-sheet'
import { Sidebar } from './_components/sidebar'

export const metadata: Metadata = {
  title: 'App',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await auth()
  const tasks = await getTasks({})
  const tags = await getTags()

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={session?.user} tasks={tasks} tags={tags} />

      <ScrollArea className="no-scrollbar h-screen flex-1">
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          <div className="mb-6 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="text" size="text">
                  <Menu />
                </Button>
              </SheetTrigger>

              <NavigationSheet tasks={tasks} tags={tags} />
            </Sheet>
          </div>

          {children}
        </div>
      </ScrollArea>
    </main>
  )
}
