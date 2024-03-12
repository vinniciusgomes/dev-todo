import { http } from '@/lib/http'

import {
  CreateTaskBody,
  GetTasksQuery,
  GetTasksResponse,
  UpdateTaskBody,
} from './types'

export async function getTasks({ completed, deleted, dueDate }: GetTasksQuery) {
  const response = await http.get<GetTasksResponse>('/tasks', {
    params: {
      completed,
      deleted,
      dueDate,
    },
  })

  return response.data
}

export async function createTask(body: CreateTaskBody) {
  const response = await http.post('/tasks', body)

  return response.data
}

export async function updateTask(body: UpdateTaskBody) {
  const response = await http.put('/tasks', body)

  return response.data
}
