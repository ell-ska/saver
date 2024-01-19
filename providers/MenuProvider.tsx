'use client'

import { useEffect, useState } from 'react'

import { SimpleBoard } from '@/lib/types'
import AddMenu from '@/components/menu/AddMenu'
import AddBoardMenu from '@/components/menu/AddBoardMenu'
import AddLinkMenu from '@/components/menu/AddLinkMenu'
import AddImageMenu from '@/components/menu/AddImageMenu'
import PickBoardMenu from '@/components/menu/PickBoardMenu'

type MenuProviderProps = {
  boards: SimpleBoard[] | undefined
}

const MenuProvider = ({ boards }: MenuProviderProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <AddMenu />
      <AddBoardMenu />
      <AddLinkMenu />
      <AddImageMenu />
      <PickBoardMenu boards={boards} />
    </>
  )
}

export default MenuProvider
