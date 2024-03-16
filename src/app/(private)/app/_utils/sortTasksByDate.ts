import { Task } from '@/services/types'

export const sortByDate = (tasks: Task[]) => {
  const formattedTasksByDueDate: Record<string, Task[]> = {}

  tasks.forEach((task) => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null
    const dueDateString = dueDate
      ? dueDate.toISOString().split('T')[0]
      : 'No date'

    formattedTasksByDueDate[dueDateString] =
      formattedTasksByDueDate[dueDateString] || []
    formattedTasksByDueDate[dueDateString].push(task)
  })

  const sortedTasksByDueDate: Record<string, Task[]> = {}

  Object.keys(formattedTasksByDueDate)
    .sort()
    .forEach((dueDate) => {
      sortedTasksByDueDate[dueDate] = formattedTasksByDueDate[dueDate]
    })

  return sortedTasksByDueDate
}
