import {
  differenceInDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns'

export function formatDueDate(date: string): string {
  const today = new Date()
  const dueDate = new Date(date)
  const localDueDate = new Date(
    dueDate.valueOf() + dueDate.getTimezoneOffset() * 60000,
  )

  if (isToday(localDueDate)) {
    return 'Today'
  } else if (isTomorrow(localDueDate)) {
    return 'Tomorrow'
  } else if (isYesterday(localDueDate)) {
    return 'Yesterday'
  } else {
    const difference = differenceInDays(localDueDate, today)
    if (difference >= 2 && difference <= 6) {
      return format(localDueDate, 'EEEE')
    } else {
      return format(localDueDate, 'EEEE, MMMM dd, yyyy')
    }
  }
}
