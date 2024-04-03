import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icon'

import { HoverBorderGradient } from '../ui/hover-border-gradient'

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

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
        <div>
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
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
                onClick={() => signIn('github')}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="text-sm">Continue with GitHub</span>
              </HoverBorderGradient>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
                onClick={() => signIn('google')}
              >
                <Icons.google className="h-4 w-4" />
                <span className="text-sm">Continue with Google</span>
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
