import React from 'react'

import EmptyState from '../(shared)/EmptyState'

import getCurrentuser from '../actions/getCurrentUser'
import getFavoriteListing from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'



const favoritesPage = async () => {
  const listings = await getFavoriteListing()
  const currentUser = getCurrentuser()

  if(listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listings.'
      />
    )
  }
  return (
    <FavoritesClient 
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default favoritesPage