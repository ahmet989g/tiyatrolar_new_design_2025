import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/images/logo/tiyatrolarcomtr.svg" alt="tiyatrolar.com.tr" width={180} height={50} />
    </Link>
  )
}

export default Logo