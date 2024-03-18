import { z } from 'zod'

export const createTagSchema = z.object({
  color: z.string(),
  name: z.string(),
})

export const deleteTagSchema = z.object({
  id: z.string(),
})

export const updateTagSchema = z.object({
  id: z.string(),
  color: z.string(),
  name: z.string(),
})
