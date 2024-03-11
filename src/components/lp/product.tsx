export const Line = () => (
  <div
    className="absolute left-[calc(50%+20px)] top-[20px] hidden h-px w-[calc(100%-40px)] group-last:hidden sm:block"
    style={{
      backgroundImage: 'linear-gradient(to right, #18181b, #3F3F46, #18181b)',
    }}
  />
)

export const Product = () => {
  return (
    <div>
      <div className="relative sm:block">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="relative rounded-lg">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <img
                src="https://volta.net/home/screenshot.png"
                alt="Hero"
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
              Log in with your <strong>GitHub account</strong>
            </p>
          </div>
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              2
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Install our <strong>GitHub app</strong> and import your
              repositories
            </p>
          </div>
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              3
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Browse your <strong>repositories</strong> and start working on{' '}
              <strong>issues</strong>
            </p>
          </div>
          <div className="group relative">
            <Line />
            <div className="icon relative mx-auto mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border font-semibold">
              4
            </div>
            <p className="prose prose-primary dark:prose-invert prose-sm mx-auto mt-2 max-w-[12rem] text-center">
              Work in <strong>real-time</strong> with your team on your{' '}
              <strong>projects</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
