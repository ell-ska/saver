'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'

const Navigation = () => {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  if (isMobile) return <BottomNavigation />
  return <Sidebar />
}

export default Navigation
