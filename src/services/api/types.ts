import { Task, TaskPriority } from '../types'

export type GetTasksResponse = Task[]

export interface GetTasksQuery {
  completed?: boolean
  deleted?: boolean
  dueDate?: string
}

export interface CreateTaskBody {
  title: string
  priority: TaskPriority
  dueDate?: string
}
