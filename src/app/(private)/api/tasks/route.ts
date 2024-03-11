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
  const dueDate = request.nextUrl.searchParams.get('dueDate') as string

  if (completed) {
    where.completed = { equals: true }
  }

  if (deleted) {
    where.deleted = { equals: true }
  }

  if (dueDate) {
    where.dueDate = { equals: new Date(dueDate) }
  }

  const result = await prisma.todo.findMany({
    where,
  })

  return NextResponse.json(
    result,

    { status: 200 },
  )
}
