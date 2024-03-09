import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { auth } from '@/services/auth'

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

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={session?.user} />

      <ScrollArea className="no-scrollbar h-screen flex-1">
        <div className="px-4 py-6 lg:px-8 lg:py-8">{children}</div>
      </ScrollArea>
    </main>
  )
}
