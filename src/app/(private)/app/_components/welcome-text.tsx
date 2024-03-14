'use client'

import { format } from 'date-fns'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function WelcomeText() {
  const [useName, setUserName] = useState<string>()

  async function getUserName() {
    const session = await getSession()

    if (!session?.user?.name) {
      return
    }

    return setUserName(session?.user?.name)
  }

  function getDayPeriod() {
    const now = new Date()
    const hour = now.getHours()
    if (hour >= 6 && hour < 12) {
      return 'morning'
    } else if (hour >= 12 && hour < 18) {
      return 'afternoon'
    } else {
      return 'evening'
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">
        Good {getDayPeriod()} {useName && `, ${useName?.split(' ')[0]}!`}{' '}
        {getDayPeriod() === 'evening' ? '🌙' : '☀️'}
      </h1>
      <span className="text-sm text-muted-foreground">
        It's {format(new Date(), 'EEEE, dd MMMM yyyy')}.
      </span>
    </div>
  )
}
