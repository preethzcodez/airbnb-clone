import { create } from "zustand";

interface ConfirmationModalStore {
  isOpen: boolean;
  id?: string;
  onAction: any;
  title: string;
  confirmationMessage: string;
  onOpen: (title: string, message: string, action: any, id?: string) => void;
  onClose: () => void;
}

const useConfirmationModal = create<ConfirmationModalStore>((set) => ({
  isOpen: false,
  title: "",
  confirmationMessage: "",
  onAction: null,
  onOpen: (title, message, action, id) =>
    set({
      isOpen: true,
      title,
      confirmationMessage: message,
      onAction: action,
      id,
    }),
  onClose: () =>
    set({
      isOpen: false,
      onAction: null,
      confirmationMessage: "",
      title: "",
      id: undefined,
    }),
}));

export default useConfirmationModal;
