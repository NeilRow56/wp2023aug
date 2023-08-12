import { create } from 'zustand';

interface useAuthModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAuthModal = create<useAuthModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));