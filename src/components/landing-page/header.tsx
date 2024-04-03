'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Icons } from '@/components/icon'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'animate-header-slide-down-fade sticky top-0 z-50 border-b backdrop-blur-sm transition duration-200 ease-in-out',
        isScrolled ? 'border-border' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto h-14 max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-full items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Icons.appIcon className="h-7 w-7 fill-primary" />
              <span className="text-sm font-bold">DevToDo</span>
            </div>
          </Link>

          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
            <Link href="/pricing">
              <span className="u-text-gray-600 hover:u-text-gray-900 focus:u-text-gray-900 text-sm font-medium focus:outline-none">
                Features
              </span>
            </Link>
            <Link href="/about">
              <span className="u-text-gray-600 hover:u-text-gray-900 focus:u-text-gray-900 text-sm font-medium focus:outline-none">
                About
              </span>
            </Link>
            <Link href="/pricing">
              <span className="u-text-gray-600 hover:u-text-gray-900 focus:u-text-gray-900 text-sm font-medium focus:outline-none">
                Pricing
              </span>
            </Link>
            <Link href="/pricing">
              <span className="u-text-gray-600 hover:u-text-gray-900 focus:u-text-gray-900 text-sm font-medium focus:outline-none">
                Contact
              </span>
            </Link>
          </div>

          <div>
            <Button
              className="rounded-full"
              size="sm"
              onClick={() => push('/auth')}
            >
              Get started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
