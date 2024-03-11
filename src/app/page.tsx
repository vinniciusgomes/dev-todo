'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

import { Footer } from '@/components/lp/footer'
import { Header } from '@/components/lp/header'
import { Hero } from '@/components/lp/hero'
import { Product } from '@/components/lp/product'

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
