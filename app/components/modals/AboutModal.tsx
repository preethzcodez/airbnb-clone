"use client";

import Image from "next/image";
import Modal from "./Modal";
import useAboutModal from "../hooks/useAboutModal";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import {
  SiNextdotjs,
  SiReact,
  SiMongodb,
  SiTailwindcss,
  SiPrisma,
} from "react-icons/si";

const AboutModal = () => {
  const aboutModal = useAboutModal();

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 pb-2">
        <Image
          alt="img"
          className="rounded-full bg-neutral-200"
          src="https://avatars.githubusercontent.com/u/7704934"
          height="100"
          width="100"
        />
        <div className="flex flex-col gap-2">
          <div className="italic">
            <Link
              target="_blank"
              href="https://github.com/preethzcodez"
              className="hover:underline"
            >
              @preethzcodez
            </Link>
          </div>
          <div className="flex gap-3">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/preethzcodez/"
            >
              <AiFillLinkedin size={30} />
            </Link>
            <Link target="_blank" href="https://github.com/preethzcodez">
              <AiFillGithub size={30} />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/preeth_prathapan_"
            >
              <AiFillInstagram size={30} />
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="py-1">
        This is a clone of the Airbnb app created solely for learning purposes.
        All the data added to this website is dummy.
      </div>
      <hr />
      <div>
        <div className="font-semibold">Tech Stack</div>
        <div className="pt-2 flex gap-6">
          <Link target="_blank" href="https://nextjs.org/">
            <SiNextdotjs size={30} />
          </Link>
          <Link target="_blank" href="https://react.dev/">
            <SiReact size={30} />
          </Link>
          <Link target="_blank" href="https://www.prisma.io/">
            <SiPrisma size={30} />
          </Link>
          <Link target="_blank" href="https://www.mongodb.com/atlas/database">
            <SiMongodb size={30} />
          </Link>
          <Link target="_blank" href="https://tailwindcss.com/">
            <SiTailwindcss size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      body={bodyContent}
      isOpen={aboutModal.isOpen}
      title="Preeth Prathapan"
      onClose={aboutModal.onClose}
    />
  );
};

export default AboutModal;
