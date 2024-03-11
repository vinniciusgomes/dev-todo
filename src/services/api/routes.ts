import { http } from '@/lib/http'

import { CreateTaskBody, GetTasksQuery, GetTasksResponse } from './types'

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
