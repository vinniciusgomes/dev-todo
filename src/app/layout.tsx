import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  authors: [{ name: 'DevToDo', url: 'https://devtodo.app' }],
  category: 'developer',
  creator: 'DevToDo',
  title: {
    default: 'DevToDo — Todo app for developers',
    template: '%s — DevToDo',
  },
  description:
    'DevToDo is a to-do list application developed specifically to meet the needs of developers. It offers a simple and effective way to manage tasks, projects, and software development goals.',
  icons: {
    apple: '/assets/images/favicon/apple-touch-icon.png',
    icon: '/assets/images/favicon/favicon.ico',
    shortcut: '/assets/images/favicon/favicon-32x32.png',
  },
  keywords: [
    'DevToDo',
    'devtodo.app',
    'todo-list',
    'todo',
    'utils',
    'developer-tools',
  ],
  openGraph: {
    images: [
      {
        width: 1920,
        height: 1080,
        url: '/assets/images/share.png',
        alt: 'DevToDo cover',
      },
    ],
    locale: 'en',
    title: 'DevToDo',
    siteName: 'DevToDo',
    description:
      'DevToDo is a to-do list application developed specifically to meet the needs of developers. It offers a simple and effective way to manage tasks, projects, and software development goals.',
    type: 'website',
    url: 'https://devtodo.app',
  },
  publisher: 'DevToDo',
  twitter: {
    images: [
      {
        width: 1920,
        height: 1080,
        url: '/assets/images/share.png',
        alt: 'DevToDo cover',
      },
    ],
    card: 'summary_large_image',
    title: 'DevToDo',
    description:
      'DevToDo is a to-do list application developed specifically to meet the needs of developers. It offers a simple and effective way to manage tasks, projects, and software development goals.',
    site: '@devtodo',
    creator: 'DevToDo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
