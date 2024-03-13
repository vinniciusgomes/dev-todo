import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

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
        <div className="px-4 py-6 lg:px-8 lg:py-16">{children}</div>
      </ScrollArea>
    </main>
  )
}
