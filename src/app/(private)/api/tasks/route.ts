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

  await prisma.todo.create({
    data: {
      title: req.title,
      priority: req.priority,
      dueDate: req.dueDate ?? null,
      user: { connect: { email: session?.user?.email } },
    },
  })

  return NextResponse.json({ status: 201 })
}

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const where: Prisma.TodoWhereInput = {
    user: { email: session?.user?.email },
  }

  const completed = request.nextUrl.searchParams.get('completed') as string
  const deleted = request.nextUrl.searchParams.get('deleted') as string

  if (completed) {
    where.completed = { equals: true }
  }

  if (deleted) {
    where.deleted = { equals: true }
  }

  let result = await prisma.todo.findMany({
    where,
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
