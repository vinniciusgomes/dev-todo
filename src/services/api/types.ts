import { Task, TaskPriority } from '../types'

export type GetTasksResponse = Task[]

export interface CreateTaskBody {
  title: string
  priority: TaskPriority
  dueDate?: Date
}
