"use client"

import { Modal } from "@/components/ui/modal"
import { useAuthModal } from "@/hooks/use-auth-modal"

export const AuthModal = () => {
    const authModal = useAuthModal()
    return (
        <Modal
   title="Register user"
   description="Form description"
   isOpen={authModal.isOpen}
   onClose={authModal.onClose}
   >
    Future Register/Login Form
   </Modal>
    )
   

}
