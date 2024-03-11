import { Task, TaskPriority } from '../types'

export type GetTasksResponse = Task[]

export interface GetTasksQuery {
  completed?: boolean
  deleted?: boolean
  dueDate?: Date
}

export interface CreateTaskBody {
  title: string
  priority: TaskPriority
  dueDate?: Date
}
