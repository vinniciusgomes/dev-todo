import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Icons } from '@/components/icon'

import { AuthForm } from './_components'

export const metadata: Metadata = {
  title: 'Auth',
}

export default function Page() {
  return (
    <div className="relative mx-auto flex h-screen w-full flex-col justify-center px-4 sm:w-[450px] sm:px-0">
      <Link
        href="/"
        className="absolute left-4 top-8 flex h-10 items-center gap-2 text-sm font-semibold text-muted-foreground sm:hidden"
      >
        <ChevronLeft className="h-4 w-4" />
        Home
      </Link>
      <div className="flex flex-col items-center space-y-2 sm:items-start">
        <Icons.appIcon className="mb-2 h-12 w-12 fill-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Log in to DevTodo
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to access your account
        </p>
      </div>

      <div className="pt-6">
        <AuthForm />
      </div>

      <p className="mt-6 px-8 text-center text-sm text-muted-foreground">
        By continuing, you agree to DevTodo's{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        , and to receive periodic emails with updates.
      </p>
    </div>
  )
}
