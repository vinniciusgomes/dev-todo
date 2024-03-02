import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { auth } from '@/services/auth'

import { Navbar } from './_components/navbar'
import { TaskDetails } from './_components/task-details'

export const metadata: Metadata = {
  title: 'App',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await auth()

  return (
    <main className="flex h-screen w-full">
      <Navbar user={session?.user} />

      <ScrollArea className="no-scrollbar h-screen flex-1">
        <div className="px-4 py-6 lg:px-8 lg:py-8">{children}</div>
      </ScrollArea>

      <div className="hidden lg:grid">
        <TaskDetails />
      </div>
    </main>
  )
}
