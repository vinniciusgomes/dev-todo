import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { Sidebar } from '@/components/settings/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

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
      <Sidebar />

      <ScrollArea className="no-scrollbar mx-auto h-screen max-w-[940px] flex-1">
        <div className="px-4 py-6 lg:px-8 lg:py-16">{children}</div>
      </ScrollArea>
    </main>
  )
}
