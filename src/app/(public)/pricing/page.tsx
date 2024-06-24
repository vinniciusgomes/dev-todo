import { Check } from 'lucide-react'

import { Footer } from '@/components/landing-page/footer'
import { Header } from '@/components/landing-page/header'
import { Button } from '@/components/ui/button'

export default function Pricing() {
  return (
    <main className="relative">
      <Header />
      <div>
        <div className="flex min-h-[calc(100vh-5rem)] flex-col">
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div className="relative px-6 py-24 sm:py-32 lg:px-8">
              <h1 className="mx-auto mt-2 max-w-2xl text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:max-w-4xl">
                Pricing
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
                Use DevTodo for free on all your GitHub organizations. Upgrade
                to enable projects, roadmaps and more advanced features for your
                organizations.
              </p>

              <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-x-px gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                <div className="rounded-2xl rounded-t-2xl bg-zinc-900/25 p-8 ring-1 ring-zinc-700 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-2xl lg:rounded-tr-none">
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-base font-semibold leading-7 text-zinc-400">
                      Free
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      $0
                    </span>
                  </div>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">
                    Meet the DevTodo experience and start collaborating in
                    real-time.
                  </p>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground sm:mt-10"
                  >
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Real-time inbox
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Unlimited organizations &amp; members
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Unlimited public &amp; private repositories
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Unlimited issues with automated board, list and timeline
                      views
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get started</Button>
                </div>
                <div className="relative rounded-2xl bg-zinc-900/75 p-8 shadow-2xl ring-1 ring-zinc-700 dark:shadow-black/75 sm:p-10 lg:py-16">
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-base font-semibold leading-7 text-zinc-400">
                      Pro
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-zinc-500 ring-opacity-10 dark:bg-zinc-400 dark:bg-opacity-10 dark:ring-zinc-400 dark:ring-opacity-20">
                      14 days trial
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      $10
                    </span>
                    <div>
                      <p className="u-text-gray-500 text-sm">per user/month</p>
                      <p className="u-text-gray-500 text-sm">
                        plus local taxes
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-base leading-7 text-muted-foreground">
                    Get more out of DevTodo with advanced features for your
                    organization.
                  </p>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground sm:mt-10 lg:mt-6"
                  >
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Everything in Free
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Roadmap planning
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Group repositories in projects
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Community leaderboard
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Issues insights (soon)
                    </li>
                    <li className="text-mu flex items-center gap-x-3">
                      <Check className="h-4 w-4" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get started</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
