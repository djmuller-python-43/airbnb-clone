import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './(shared)/Navbar/Navbar'

import RegisterModal from './(shared)/Modal/RegisterModal'
import LoginModal from './(shared)/Modal/LoginModal'
import RentModal from './(shared)/Modal/RentModal'

import getCurrentUser from './actions/getCurrentUser'
import { Toaster } from 'react-hot-toast'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        {children}
      
      </body>
    </html>
  )
}
