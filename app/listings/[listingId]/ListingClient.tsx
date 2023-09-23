'use client'
import { Reservation } from '@prisma/client'
import { safeListing, safeUser } from '../../types'
import React, { useMemo } from 'react'
import { categories } from '../../(shared)/Navbar/Categories'
import Container from '../../(shared)/Container'
import ListingHead from '../../(shared)/Listing/ListingHead'
import ListingInfo from '../../(shared)/Listing/ListingInfo'

interface ListingClientProps {
  listing: safeListing & {
    user: safeUser
  },
  currentUser?: safeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  },[listing.category])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead 
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className='
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          '>
            <ListingInfo 
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}

            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient