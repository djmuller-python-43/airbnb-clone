'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'

import { signOut } from 'next-auth/react'
import { safeUser } from '@/app/types'


interface UserMenuProps {
  currentUser?: safeUser | null
}


const UserMenu: React.FC<UserMenuProps> = ({currentUser})  => {
  const [isOpen, setIsOpen] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  },[])

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    // Open rent modal
    rentModal.onOpen
  },[currentUser, loginModal, rentModal])
  return (
    <div className='relative'>
      <div className='flex items-center gap-3'>
        <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer' onClick={rentModal.onOpen}>
          Airbnb your home
        </div>
        <div className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute right-0 top-12 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? 
            (
            <>
              <MenuItem onClick={() => {}} label='My Trips'/>
              <MenuItem onClick={() => {}} label='My Favorites'/>
              <MenuItem onClick={() => {}} label='My Reservations'/>
              <MenuItem onClick={() => {}} label='My Properties'/>
              <MenuItem onClick={rentModal.onOpen} label='Airbnb my home'/>
              <hr />
              <MenuItem onClick={() => signOut()} label=' Logout'/>
            </>
            ) 
            : 
            (
            <>
              <MenuItem onClick={loginModal.onOpen} label='Login'/>
              <MenuItem onClick={registerModal.onOpen} label='Sign Up'/>
            </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu