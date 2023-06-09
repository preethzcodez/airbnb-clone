"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // Prevent outside scroll if the modal is open
  useEffect(() => {
    const handleBodyScroll = (event: Event) => {
      event.preventDefault();
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("scroll", handleBodyScroll, {
        passive: false,
      });
    } else {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("scroll", handleBodyScroll);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("scroll", handleBodyScroll);
    };
  }, [showModal]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed 
        h-full 
        flex
        flex-col
        items-center
        justify-center
        z-50 
        w-full 
        overflow-hidden
        outline-none
        focus:outline-none
        bg-neutral-800/70
      "
    >
      <div
        className=" 
          relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto
          rounded-lg
          overflow-hidden
        "
      >
        {/* CONTENT */}
        <div
          className={`
            translate
            duration-300
            shadow-lg
            bg-white
            h-full
            flex
            flex-col
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
        `}
        >
          {/* HEADER */}
          <div
            className="
            flex
            items-center
            p-6
            rounded-t
            justify-center
            relative
            border-b-[1px]
          "
          >
            <button
              onClick={handleClose}
              className="
                p-1
                border-0
                hover:opacity-70
                transition
                absolute
                left-4
            "
            >
              <IoMdClose size={18} />
            </button>
            <div className="text-lg font-semibold">{title}</div>
          </div>
          <div className="overflow-y-auto">
            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div
                className="
                flex
                flex-row
                items-center
                gap-4
                w-full
              "
              >
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}

                {actionLabel && onSubmit && (
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                )}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
