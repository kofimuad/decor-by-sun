import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Service from '@/models/Service'

// PATCH — update service
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const body = await req.json()
  const service = await Service.findByIdAndUpdate(params.id, body, { new: true })
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ service })
}

// DELETE
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  await Service.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
