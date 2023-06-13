"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
import Link from "next/link";
import useAboutModal from "../hooks/useAboutModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const aboutModal = useAboutModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleItemClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open Rent Modal
    rentModal.onOpen();
    setIsOpen(false);
  }, [currentUser, loginModal, rentModal]);

  const onAbout = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open Rent Modal
    aboutModal.onOpen();
    setIsOpen(false);
  }, [currentUser, loginModal, aboutModal]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
        "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <Link href="/trips">
                  <MenuItem
                    label="My trips"
                    onClick={() => {
                      handleItemClick();
                    }}
                  />
                </Link>

                <Link href="/favorites">
                  <MenuItem
                    onClick={() => {
                      handleItemClick();
                    }}
                    label="My favorites"
                  />
                </Link>

                <Link href="/reservations">
                  <MenuItem
                    onClick={() => {
                      handleItemClick();
                    }}
                    label="My reservations"
                  />
                </Link>

                <Link href="/properties">
                  <MenuItem
                    onClick={() => {
                      handleItemClick();
                    }}
                    label="My properties"
                  />
                </Link>

                <MenuItem
                  onClick={() => {
                    rentModal.onOpen();
                    handleItemClick();
                  }}
                  label="Airbnb your home"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    aboutModal.onOpen();
                    handleItemClick();
                  }}
                  label="About Me"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                    handleItemClick();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    handleItemClick();
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    handleItemClick();
                  }}
                  label="Sign up"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    aboutModal.onOpen();
                    handleItemClick();
                  }}
                  label="About Me"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
