import { ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icon'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <div
      className="relative"
      style={{
        background:
          'radial-gradient(circle at top center,#0a0a0a,transparent 70%)',
      }}
    >
      <img
        src="/assets/images/landing-page/bghero.png"
        alt="hero"
        className="absolute -top-20 -z-[10] h-[calc(100vh+162px)] w-screen object-cover md:h-[calc(100vh+120px)]"
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-32 pt-20 sm:px-6 lg:px-8 lg:pb-40 lg:pt-28">
        <div>
          <div className="-mt-8 mb-8 flex justify-center sm:mt-0">
            <a
              href="/changelog"
              className="focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex flex-shrink-0 items-center gap-x-1.5 rounded-full bg-white !py-1.5 px-2.5 py-1.5 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:outline-none focus-visible:outline-0 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-75 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:hover:bg-zinc-800/50 dark:disabled:bg-zinc-900"
            >
              35% off for first-time users
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div>
            <h1 className="text-gradient text-center text-5xl font-bold tracking-tight sm:text-7xl">
              To do list
              <br />
              for developers
            </h1>
            <p className="mt-6 text-center text-muted-foreground">
              Easily manage your tasks all in one place. Simplify your workflow
              and stay focused on development. Created by developers for
              developers.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="inline-flex w-max flex-shrink-0 items-center gap-x-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur-sm transition-colors duration-100 hover:border-white/30 hover:bg-white/5 focus:border-white/30 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 dark:text-white dark:shadow-black/10"
                type="button"
                onClick={() => signIn('github')}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="">Continue with GitHub</span>
              </Button>
              <Button
                className="inline-flex w-max flex-shrink-0 items-center gap-x-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur-sm transition-colors duration-100 hover:border-white/30 hover:bg-white/5 focus:border-white/30 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 dark:text-white dark:shadow-black/10"
                type="button"
                onClick={() => signIn('google')}
              >
                <Icons.google className="h-4 w-4" />
                <span className="">Continue with Google</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
