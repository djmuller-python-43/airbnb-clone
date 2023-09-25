import React from 'react'
import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
import EmptyState from "../../(shared)/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from '@/app/actions/getReservations';



interface IParams {
  listingId?: string;
}


const ListingPage = async({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
        <EmptyState />
    )}
  return (
    <ListingClient 
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}

export default ListingPage