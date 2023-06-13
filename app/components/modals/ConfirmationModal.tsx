"use client";

import useConfirmationModal from "../hooks/useConfirmationModal";
import Modal from "./Modal";

const ConfirmationModal = () => {
  const confirmationModal = useConfirmationModal();
  const bodyContent = (
    <div className="text-lg">{confirmationModal.confirmationMessage}</div>
  );
  return (
    <Modal
      body={bodyContent}
      isOpen={confirmationModal.isOpen}
      title={confirmationModal.title}
      onSubmit={() => {
        confirmationModal.onAction(confirmationModal.id);
        confirmationModal.onClose();
      }}
      actionLabel="Yes"
      secondaryActionLabel="No"
      secondaryAction={confirmationModal.onClose}
      onClose={confirmationModal.onClose}
    />
  );
};

export default ConfirmationModal;
