'use client'

import { safeListing, safeReservation, safeUser } from '../../types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { categories } from '../../(shared)/Navbar/Categories'
import Container from '../../(shared)/Container'
import ListingHead from '../../(shared)/Listing/ListingHead'
import ListingInfo from '../../(shared)/Listing/ListingInfo'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingReservation from '@/app/(shared)/Listing/ListingReservation'
import { Range } from 'react-date-range'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  reservations: safeReservation[]
  listing: safeListing & {
    user: safeUser
  },
  currentUser?: safeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      dates = [...dates, ...range]

    })
    return dates
    
  },[reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setdateRange] = useState<Range>(initialDateRange)

  // Book a reservation for current listing
  const onCreateReservation = useCallback(() => { 
    if (!currentUser) return loginModal.onOpen()

    setIsLoading(true)
    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(() => {
      toast.success('Listing Reserved')
      setdateRange(initialDateRange)
  
      router.push('/trips')
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
    .finally(() => {
      setIsLoading(false)
    })
  },[
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {

      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      }else {
        setTotalPrice(listing.price)
      }
    }
  },[dateRange, listing.price])

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
            <div
              className='
                order-first
                mb-10
                md:order-last
                md:col-span-3
              '
            >
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setdateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient