'use server'

import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { TaskPriority } from '@/types'

import {
  createTaskSchema,
  getTasksQuerySchema,
  updateTaskSchema,
} from './schema'

export async function getTasks(query: z.infer<typeof getTasksQuerySchema>) {
  const session = await auth()

  const tasks = await prisma.task.findMany({
    where: {
      user: { email: session?.user?.email },
      completed: query.completed,
      deleted: query.deleted,
      dueDate: query.dueDate,
      tagId: query.tagId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tag: true,
    },
  })

  const priorityOrder: Record<TaskPriority, number> = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1,
    none: 0,
  }

  tasks.sort((a, b) => {
    const priorityA = a.priority || 'none'
    const priorityB = b.priority || 'none'

    return priorityOrder[priorityB] - priorityOrder[priorityA]
  })

  return tasks
}

export async function createTask(data: z.infer<typeof createTaskSchema>) {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  let tagConnect = {}

  if (data.tagId) {
    tagConnect = { connect: { id: data.tagId } }
  }

  await prisma.task.create({
    data: {
      title: data.title,
      priority: data.priority,
      dueDate: data.dueDate,
      tag: tagConnect,
      user: { connect: { email: session?.user?.email } },
    },
  })

  return {
    error: null,
    data: 'Task created successfully',
  }
}

export async function updateTask(data: z.infer<typeof updateTaskSchema>) {
  await prisma.task.update({
    where: {
      id: data.id,
    },
    data: {
      completed: data.completed,
    },
  })
}
