'use client'

import { useEffect, useState } from 'react'

const MenuProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return <></>
}

export default MenuProvider
