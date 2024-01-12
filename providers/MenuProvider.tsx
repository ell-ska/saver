'use client'

import AddMenu from '@/components/menu/AddMenu'
import { useEffect, useState } from 'react'

const MenuProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <AddMenu />
    </>
  )
}

export default MenuProvider
