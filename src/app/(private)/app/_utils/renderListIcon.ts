import { Calendar, CalendarDays, CalendarOff, Sunrise } from 'lucide-react'

import { formatDueDate } from './formatDueDate'

export function renderListIcon(dueDate: string) {
  if (dueDate === 'No date') {
    return CalendarOff
  }

  switch (formatDueDate(dueDate)) {
    case 'Tomorrow':
      return Sunrise
    case 'Today':
      return Calendar
    default:
      return CalendarDays
  }
}
