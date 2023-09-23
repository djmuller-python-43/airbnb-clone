'use client'

import useCountries from '@/app/hooks/useCountries'
import { safeUser } from '@/app/types'
import React from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

interface ListingHeadProp {
  id: string
  title: string
  locationValue: string
  imageSrc: string
  currentUser?: safeUser | null 
}

const ListingHead: React.FC<ListingHeadProp> = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)
  return (
    <>
      <Heading 
       title={title}
       subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className='
          relative
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
        '
      >
        <Image 
        src={imageSrc}
        alt='Image'
        fill
        className='object-cover'
        />
        <div className='absolute top-5 right-5 '>
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead