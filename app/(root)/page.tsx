"use client"

import { useEffect } from "react"

import { useAuthModal } from "@/hooks/use-auth-modal"



const HomePage = () => {
  const onOpen = useAuthModal((state) => state.onOpen)
  const isOpen = useAuthModal((state) => state.isOpen)

  useEffect(() => {
    if(!isOpen) {
      onOpen()
    }
  }, [ isOpen, onOpen])

  return  null
}

export default HomePage