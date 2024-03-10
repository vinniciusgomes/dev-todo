import { http } from '@/lib/http'

import { CreateTaskBody, GetTasksResponse } from './types'

export async function getTasks() {
  const response = await http.get<GetTasksResponse>('/tasks')

  return response.data
}

export async function createTask(body: CreateTaskBody) {
  const response = await http.post('/tasks', body)

  return response.data
}
