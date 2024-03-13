import { Tag, Task, TaskPriority } from '../types'

export type GetTasksResponse = Task[]

export interface GetTasksQuery {
  completed?: boolean
  deleted?: boolean
  dueDate?: string
  tagId?: string
}

export interface CreateTaskBody {
  title: string
  priority: TaskPriority
  dueDate?: string
}

export interface UpdateTaskBody {
  id: string
  title?: string
  priority?: TaskPriority
  dueDate?: string
  completed?: boolean
  deleted?: boolean
}

export interface CreateTagBody {
  name: string
  color: string
}

export type GetTagsResponse = Tag[]
