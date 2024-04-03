import { Copy } from 'lucide-react'

import { BentoGrid, BentoGridItem } from '../ui/bento-grid'

export const Line = () => (
  <div
    className="absolute left-[calc(50%+20px)] top-[20px] hidden h-px w-[calc(100%-40px)] group-last:hidden sm:block"
    style={{
      backgroundImage: 'linear-gradient(to right, #18181b, #3F3F46, #18181b)',
    }}
  />
)

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
)

const items = [
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
    header: <Skeleton />,
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
    header: <Skeleton />,
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and functional design.',
    header: <Skeleton />,
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'The Power of Communication',
    description:
      'Understand the impact of effective communication in our lives.',
    header: <Skeleton />,
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
    header: <Skeleton />,
    icon: <Copy className="h-4 w-4 text-neutral-500" />,
  },
]

export const Product = () => {
  return (
    <div>
      <div className="relative sm:block">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="relative rounded-lg">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg border border-border shadow-lg">
              <img
                src="/assets/images/landing-page/product.png"
                alt="DevToDo home page"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:py-16 lg:px-8 lg:pb-32">
        <div className="grid gap-y-8 sm:grid-cols-4">
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              1
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Access your account seamlessly with{' '}
              <strong>Google, GitHub, or email</strong> login options.
            </p>
          </div>
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              2
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Create tags <strong>to easily manage</strong> your day-to-day
              tasks
            </p>
          </div>
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              3
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Create and track all your daily tasks{' '}
              <strong>simply and easily</strong>.
            </p>
          </div>
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              4
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Stay <strong>organized</strong> throughout your day{' '}
              <strong>without missing</strong> any important tasks.
            </p>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-center text-4xl font-bold capitalize text-white">
              Features
            </h2>
            <p className="mt-6 text-center text-muted-foreground">
              Easily manage your tasks all in one place. Simplify your workflow
              and stay focused on development. Created by developers for
              developers.
            </p>
          </div>

          <BentoGrid className="w-full">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  )
}
