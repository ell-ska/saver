'use client'

import { useEffect, useState } from 'react'

import type { SimpleBoard } from '@/lib/types'
import { AddMenu } from '@/components/menu/AddMenu'
import { AddBoardMenu } from '@/components/menu/AddBoardMenu'
import { AddLinkMenu } from '@/components/menu/AddLinkMenu'
import { AddImageMenu } from '@/components/menu/AddImageMenu'
import { PickBoardMenu } from '@/components/menu/PickBoardMenu'
import { BoardMenu } from '@/components/menu/BoardMenu'
import { CardMenu } from '@/components/menu/CardMenu'
import { ConfirmMenu } from '@/components/menu/ConfirmMenu'

export const MenuProvider = ({
  boards,
}: {
  boards: SimpleBoard[] | undefined
}) => {
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
      <BoardMenu />
      <CardMenu />
      <ConfirmMenu />
    </>
  )
}
