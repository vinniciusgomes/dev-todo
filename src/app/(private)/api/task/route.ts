/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function POST(request: NextRequest) {
  const res = await request.json()

  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await prisma.todo.create({
    data: {
      title: res.title,
      priority: res.title,
      dueDate: res.date ?? null,
      user: { connect: { email: session?.user?.email } },
    },
  })

  return NextResponse.json({ result }, { status: 201 })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await prisma.todo.findMany({
    where: { user: { email: session?.user?.email } },
  })

  console.log(result)

  return NextResponse.json({ status: 200 })
}
