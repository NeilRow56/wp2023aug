import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider';
import AuthContext from '@/providers/session-provider';


import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'wp2023',
  description: "Accountant's working papers file",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthContext>
      <ToastProvider />
        <ModalProvider />
        {children}
      </AuthContext>
      
      </body>
    </html>
  )
}
