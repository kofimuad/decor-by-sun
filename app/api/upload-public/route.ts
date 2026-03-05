import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Public upload — no auth, used by booking form for inspiration images
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    const bytes    = await file.arrayBuffer()
    const buffer   = Buffer.from(bytes)
    const ext      = path.extname(file.name || 'image.jpg') || '.jpg'
    const safeName = `insp-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`

    // Use process.cwd() which works on all platforms including Windows
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, safeName), buffer)

    return NextResponse.json({ url: `/uploads/${safeName}` })
  } catch (err: any) {
    console.error('Public upload error:', err?.message || err)
    return NextResponse.json({ error: 'Upload failed: ' + (err?.message || 'Unknown error') }, { status: 500 })
  }
}
