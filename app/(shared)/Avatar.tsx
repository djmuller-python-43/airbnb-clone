'use client'

import Image from 'next/image'

interface AvatarProps {
  src: string | undefined | null
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image src={src || '/images/placeholder.jpg'} alt='Avatar' className='rounded-full' width={30} height={30}/>
  )
}

export default Avatar