'use server'

import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { createTagSchema, deleteTagSchema, updateTagSchema } from './schema'

export async function createTag(data: z.infer<typeof createTagSchema>) {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  await prisma.tag.create({
    data: {
      color: data.color,
      name: data.name,
      user: { connect: { email: session.user.email } },
    },
  })

  return {
    error: null,
    data: 'Tag created successfully',
  }
}

export async function getTags() {
  const session = await auth()

  const tags = await prisma.tag.findMany({
    where: {
      user: { email: session?.user?.email },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tasks: true,
    },
  })

  return tags
}

export async function deleteTag(data: z.infer<typeof deleteTagSchema>) {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  const tag = await prisma.tag.findUnique({
    where: {
      id: data.id,
      user: { email: session?.user?.email },
    },
  })

  if (!tag) {
    return {
      error: 'Not found',
      data: null,
    }
  }

  await prisma.tag.delete({
    where: {
      id: data.id,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: 'Tag deleted successfully',
  }
}

export async function updateTag(data: z.infer<typeof updateTagSchema>) {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  const tag = await prisma.tag.findUnique({
    where: {
      id: data.id,
      user: { email: session?.user?.email },
    },
  })

  if (!tag) {
    return {
      error: 'Not found',
      data: null,
    }
  }

  await prisma.tag.update({
    where: {
      id: data.id,
    },
    data: {
      color: data.color,
      name: data.name,
    },
  })

  return {
    error: null,
    data: 'Tag updated successfully',
  }
}
