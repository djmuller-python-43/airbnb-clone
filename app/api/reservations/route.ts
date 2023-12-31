import { Listing } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from '../../libs/prismadb'
import getCurrenUser from '../../actions/getCurrentUser'

export async function POST(request: Request) {
  const CurrentUser = await getCurrenUser()

  if (!CurrentUser) return NextResponse.error()

  const body = await request.json()

  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
  } = body

  if(!listingId || !startDate || !endDate || !totalPrice) return NextResponse.error() 

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: CurrentUser.id,
          startDate,
          endDate,
          totalPrice
        }
      }
    }
  })

  return NextResponse.json(listingAndReservation)

}

