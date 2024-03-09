/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

import { prisma } from '../../../../services/database'

export async function POST(request: NextRequest) {
  const { title, priority, date }: any = request.body

  console.log(request.body)

  const session = await getSession()
  if (!session?.user?.email) {
    NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return
  }

  const result = await prisma.todo.create({
    data: {
      title,
      priority,
      dueDate: date ?? null,
      user: { connect: { email: session?.user?.email } },
    },
  })
  NextResponse.json(result)
}
