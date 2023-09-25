import React from 'react'
import { safeReservation, safeUser } from '../types'

interface TripsClientProps {
  reservations: safeReservation[],
  currentUser: safeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  return (
    <div>TripsClient</div>
  )
}

export default TripsClient