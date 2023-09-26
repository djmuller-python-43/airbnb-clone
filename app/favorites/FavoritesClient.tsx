import React from 'react'
import { safeListing, safeUser } from '../types'
import Container from '../(shared)/Container'
import Heading from '../(shared)/Heading'
import ListingCard from '../(shared)/Listing/ListingCard'

interface FavoritesClientProps {
  listings: safeListing[]
  currentUser?: safeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <Heading 
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div
        className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
      >
        {listings.map((listing) => (
          <ListingCard 
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient