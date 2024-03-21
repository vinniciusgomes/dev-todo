import { Task } from '@/types'

export const sortByDate = (tasks: Task[]) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0) // Ajustando para a meia-noite de ontem

  const overdueTasks: Task[] = []
  const formattedTasksByDueDate: Record<string, Task[]> = {}

  tasks.forEach((task) => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null

    if (dueDate && dueDate < yesterday) {
      // Se a tarefa estiver vencida (antes de ontem), adicione-a às tarefas vencidas
      overdueTasks.push(task)
    } else {
      const dueDateString = dueDate
        ? dueDate.toISOString().split('T')[0]
        : 'No date'

      formattedTasksByDueDate[dueDateString] =
        formattedTasksByDueDate[dueDateString] || []
      formattedTasksByDueDate[dueDateString].push(task)
    }
  })

  const sortedTasksByDueDate: Record<string, Task[]> = {}

  // Adiciona as tarefas vencidas no começo
  sortedTasksByDueDate.Overdue = overdueTasks

  // Adiciona as tarefas restantes
  Object.keys(formattedTasksByDueDate)
    .sort()
    .forEach((dueDate) => {
      sortedTasksByDueDate[dueDate] = formattedTasksByDueDate[dueDate]
    })

  return sortedTasksByDueDate
}
