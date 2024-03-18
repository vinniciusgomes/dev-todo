'use client'

import { format } from 'date-fns'

type Props = {
  userName: string
}

export function WelcomeText({ userName }: Props) {
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

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">
        Good {getDayPeriod()}
        {userName && `, ${userName?.split(' ')[0]}!`}{' '}
        {getDayPeriod() === 'evening' ? '🌙' : '☀️'}
      </h1>
      <span className="text-sm text-muted-foreground">
        It's {format(new Date(), 'EEEE, dd MMMM yyyy')}.
      </span>
    </div>
  )
}
