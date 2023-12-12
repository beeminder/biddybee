'use client'

import { SessionProvider as NextSessionProvider } from 'next-auth/react'

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {
  return <NextSessionProvider session={session}>{children}</NextSessionProvider>
}
