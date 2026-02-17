import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className="hidden md:block">
      <Image src="/logo.png" alt="Logo" width={60} height={50} priority />
    </div>
  )
}

export default Footer