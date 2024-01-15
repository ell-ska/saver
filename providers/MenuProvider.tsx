'use client'

import { useEffect, useState } from 'react'

import AddMenu from '@/components/menu/AddMenu'
import AddLinkMenu from '@/components/menu/AddLinkMenu'

const MenuProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <AddMenu />
      <AddLinkMenu />
    </>
  )
}

export default MenuProvider
