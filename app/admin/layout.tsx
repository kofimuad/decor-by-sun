import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SunLogo from '@/components/ui/SunLogo'
import AdminLogout from './AdminLogout'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the session
  const session = await getServerSession(authOptions)

  // If no session, let the login page render freely (it handles its own UI)
  // We check the pathname via a workaround: login page passes a special prop
  // Instead — move session check to individual protected pages, not the layout
  // This prevents the login page from being caught in the redirect loop

  return (
    <>
      {children}
    </>
  )
}
