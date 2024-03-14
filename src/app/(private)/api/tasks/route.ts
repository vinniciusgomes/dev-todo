import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function POST(request: NextRequest) {
  const req = await request.json()

  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let tagConnect = {}
  if (req.tagId) {
    tagConnect = { connect: { id: req.tagId } }
  }

  await prisma.task.create({
    data: {
      title: req.title,
      priority: req.priority,
      dueDate: req.dueDate ?? null,
      user: { connect: { email: session?.user?.email } },
      tag: tagConnect,
    },
  })

  return NextResponse.json({ status: 201 })
}

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const where: Prisma.TaskWhereInput = {
    user: { email: session?.user?.email },
  }

  const queryParams = request.nextUrl.searchParams

  interface FilterOptions {
    completed: string | null
    deleted: string | null
    dueDate: string | null
    tagId: string | null
  }

  const filterOptions: FilterOptions = {
    completed: queryParams.get('completed'),
    deleted: queryParams.get('deleted'),
    dueDate: queryParams.get('dueDate'),
    tagId: queryParams.get('tagId'),
  }

  Object.keys(filterOptions).forEach((key) => {
    const value = filterOptions[key as keyof FilterOptions]
    if (value !== null && value !== undefined) {
      switch (key) {
        case 'completed':
          where.completed = { equals: value === 'true' }
          break
        case 'deleted':
          where.deleted = { equals: value === 'true' }
          break
        case 'dueDate':
          where.dueDate = { equals: value }
          break
        case 'tagId':
          where.tagId = { equals: value }
          break
      }
    }
  })

  let result = await prisma.task.findMany({
    where,
    include: {
      tag: true,
    },
  })

  result = result.sort((a, b) => {
    if (a.priority === 'urgent' && b.priority !== 'urgent') {
      return -1
    }
    if (b.priority === 'urgent' && a.priority !== 'urgent') {
      return 1
    }

    if (a.priority === b.priority) {
      if (!a.dueDate && !b.dueDate) {
        return 0
      } else if (!a.dueDate) {
        return 1
      } else if (!b.dueDate) {
        return -1
      } else {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
    }

    return a.priority.localeCompare(b.priority)
  })

  return NextResponse.json(result, { status: 200 })
}

export async function PUT(request: NextRequest) {
  const req = await request.json()
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const taskId = req.id

  const updatedData = {
    title: req.title,
    priority: req.priority,
    dueDate: req.dueDate,
    completed: req.completed,
    deleted: req.deleted,
  }

  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      user: { email: session.user.email },
    },
  })

  if (!existingTask) {
    return NextResponse.json(
      { error: 'Task not found or unauthorized' },
      { status: 404 },
    )
  }

  try {
    await prisma.task.update({
      where: { id: taskId },
      data: updatedData,
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 },
    )
  }
}
