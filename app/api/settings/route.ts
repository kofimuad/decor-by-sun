import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Setting from '@/models/Setting'

// GET all settings — public (used by Hero to fetch image URL)
export async function GET() {
  await connectDB()
  const settings = await Setting.find()
  const map: Record<string, string> = {}
  settings.forEach(s => { map[s.key] = s.value })
  return NextResponse.json({ settings: map })
}

// POST — upsert a setting (admin only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key, value } = await req.json()
  if (!key || !value) return NextResponse.json({ error: 'Key and value required.' }, { status: 400 })

  await connectDB()
  await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
  return NextResponse.json({ success: true })
}
