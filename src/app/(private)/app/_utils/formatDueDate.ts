import { differenceInDays, format, isTomorrow, isYesterday } from 'date-fns'

export function formatDueDate(date: string): string {
  const today = new Date()
  const dueDate = new Date(date)
  const localDueDate = new Date(
    dueDate.valueOf() + dueDate.getTimezoneOffset() * 60000,
  )

  const isSameDay = (date1: Date | number, date2: Date | number): boolean => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  if (isSameDay(localDueDate, today)) {
    return 'Today'
  } else if (isTomorrow(localDueDate)) {
    return 'Tomorrow'
  } else if (isYesterday(localDueDate)) {
    return 'Yesterday'
  } else {
    const difference = differenceInDays(localDueDate, today)
    if (difference >= 1 && difference <= 6) {
      return format(localDueDate, 'EEEE')
    } else {
      return format(localDueDate, 'EEEE, MMMM dd, yyyy')
    }
  }
}
