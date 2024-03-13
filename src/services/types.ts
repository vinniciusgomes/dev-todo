export type TaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent'

export type Task = {
  id?: string
  title: string
  description?: string
  userId?: string
  completed?: boolean
  dueDate?: string
  priority: TaskPriority
  deleted?: boolean
  createdAt?: string
  updatedAt?: string
  todoTagId?: string
  tag?: {
    id: string
    name: string
    color: string
    disabled: boolean
    userId: string
    createdAt: string
    updatedAt: string
  }
}

export type Tag = {
  id?: string
  name: string
  color: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}
