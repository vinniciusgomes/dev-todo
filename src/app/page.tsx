'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

import { Footer } from '@/components/landing-page/footer'
import { Header } from '@/components/landing-page/header'
import { Hero } from '@/components/landing-page/hero'
import { Product } from '@/components/landing-page/product'

export default function Home() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [])

  return (
    <main className="relative">
      <Header />

      <Hero />

      <Product />

      <Footer />
    </main>
  )
}
