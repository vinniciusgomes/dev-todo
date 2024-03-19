import { z } from 'zod'

export const getTasksQuerySchema = z.object({
  completed: z.boolean().optional(),
  deleted: z.boolean().optional(),
  dueDate: z.string().optional(),
  tagId: z.string().optional(),
})

export const createTaskSchema = z.object({
  title: z.string(),
  priority: z.enum(['none', 'low', 'medium', 'high', 'urgent']),
  dueDate: z.string(),
  tagId: z.string().optional(),
})

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  priority: z.enum(['none', 'low', 'medium', 'high', 'urgent']).optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().optional(),
  deleted: z.boolean().optional(),
  tagId: z.string().optional(),
})
