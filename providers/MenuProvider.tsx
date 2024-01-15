'use client'

import { useEffect, useState } from 'react'

import AddMenu from '@/components/menu/AddMenu'
import AddLinkMenu from '@/components/menu/AddLinkMenu'
import AddImageMenu from '@/components/menu/AddImageMenu'
import PickBoardMenu from '@/components/menu/PickBoardMenu'

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
      <AddImageMenu />
      <PickBoardMenu />
    </>
  )
}

export default MenuProvider
