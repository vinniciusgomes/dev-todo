import { Icons } from '../icon'

export const Footer = () => {
  return (
    <footer className="relative z-10">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:flex md:items-center md:justify-between md:py-12 lg:px-8">
        <div className="flex items-center justify-center gap-4 md:order-3">
          <a
            href="https://github.com/nuxtlabs"
            rel="noopener noreferrer"
            target="_blank"
            className="focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex flex-shrink-0 items-center gap-x-2 rounded-md text-sm font-medium text-gray-500 underline-offset-4 hover:text-gray-700 hover:underline focus:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-75 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icons.gitHub className="h-4 w-4" />
          </a>
        </div>
        <ul className="mt-4 flex items-center justify-center gap-x-4 overflow-x-auto md:order-2 md:mt-0 lg:gap-x-6">
          <li className="">
            <a
              href="/docs"
              className="text-sm text-muted-foreground transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              Guide
            </a>
          </li>
          <li className="">
            <a
              href="/changelog"
              className="text-sm text-muted-foreground transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              Changelog
            </a>
          </li>
          <li className="">
            <a
              href="/pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              Pricing
            </a>
          </li>
          <li className="hidden sm:block">
            <a
              href="/extension"
              className="hidden text-sm text-muted-foreground hover:text-white focus:text-white focus:outline-none sm:block"
            >
              Extension
            </a>
          </li>
          <li className="hidden sm:block">
            <a
              href="/download"
              className="hidden text-sm text-muted-foreground hover:text-white focus:text-white focus:outline-none sm:block"
            >
              Download
            </a>
          </li>
          <li className="">
            <a
              href="/cguv.pdf"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-muted-foreground transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              Terms
            </a>
          </li>
          <li className="">
            <a
              href="https://status.volta.net"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-muted-foreground transition-colors hover:text-white focus:text-white focus:outline-none"
            >
              Status
            </a>
          </li>
        </ul>
        <div className="mt-4 md:order-1 md:mt-0">
          <div className="flex items-baseline justify-center gap-1.5 text-center text-sm text-muted-foreground">
            Made by{' '}
            <a href="https://vinniciusgomes.dev" rel="noopener noreferrer">
              <Icons.vg className="h-auto w-14 text-white" />
            </a>{' '}
            © 2024
          </div>
        </div>
      </div>
    </footer>
  )
}
