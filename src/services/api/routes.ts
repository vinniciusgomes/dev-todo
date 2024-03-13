import { http } from '@/lib/http'

import {
  CreateTagBody,
  CreateTaskBody,
  GetTagsResponse,
  GetTasksQuery,
  GetTasksResponse,
  UpdateTaskBody,
} from './types'

export async function getTasks({
  completed,
  deleted,
  dueDate,
  tagId,
}: GetTasksQuery) {
  const response = await http.get<GetTasksResponse>('/tasks', {
    params: {
      completed,
      deleted,
      dueDate,
      tagId,
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

export async function createTag(body: CreateTagBody) {
  const response = await http.post('/tags', body)

  return response.data
}

export async function getTags() {
  const response = await http.get<GetTagsResponse>('/tags')

  return response.data
}
