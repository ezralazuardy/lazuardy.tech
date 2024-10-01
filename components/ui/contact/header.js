"use client";

import Link from "next/link";
import Logo from "@/components/ui/logo";
import CanvasGradient from "@/components/ui/work/gradient/canvas-gradient";
import { ArrowRight, Calendar } from "lucide-react";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { performRedirectHome, performRedirectContact } from "@/lib/utils";

export default forwardRef(function Header(props, ref) {
  const { className, loader } = props;
  const router = useRouter();

  return (
    <>
      <div className="relative align-bottom h-[78vh]">
        <div className="absolute inset-0 w-full h-full">
          <CanvasGradient />
        </div>
        <div className="w-full absolute bottom-0 left-0 p-12 text-white pointer-events-none">
          <div className="font-bold text-8xl leading-thight">
            We Would ❤️ to
            <br />
            Hear From You.
          </div>
          <div className="w-full font-light text-xl leading-relaxed mt-10 flex grid-cols-2">
            <div className="w-full flex justify-start">
              Let&apos;s cut the bs, here we keep all things simple.
              <br />
              Please ask us anything via email.
            </div>
            <div className="w-full flex justify-end"></div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-12">
          <div className="flex gap-2 mb-2 text-white text-md font-light justify-end">
            Feeling Urgent? Let&apos;s
            <span className="underline">
              <Link
                href="https://calendly.com/ezralazuardy/free-consultation"
                target="_blank"
              >
                schedule a meeting.
              </Link>
            </span>
          </div>
          <div className="flex gap-2 mb-2 text-white text-3xl font-light mt-4">
            <ArrowRight className="w-9 h-9 mt-1" />
            <Link href="mailto:contact@lazuardy.tech" target="_blank">
              contact@lazuardy.tech
            </Link>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`${className} header transition-all duration-500 absolute top-0 left-0 w-full text-white py-6 px-12 grid grid-cols-2 gap-4 ease-in-out pointer-events-auto`}
      >
        <Logo className="w-full text-start text-xl" />
        <div className="w-full text-end justify-end text-lg font-light font-sans flex">
          <span
            className="text-end transition-colors text-gray-500 font-medium hover:text-white hover:cursor-pointer"
            onClick={() => performRedirectHome(router, loader)}
          >
            home
          </span>
          <span
            className="text-end transition-colors text-white font-medium hover:text-white hover:cursor-pointer ms-6"
            onClick={() => performRedirectContact(router, loader)}
          >
            contact
          </span>
          <span className="text-end transition-colors text-gray-500 font-medium hover:text-white hover:cursor-pointer ms-6">
            <Link href="https://blog.lazuardy.tech" target="_blank">
              article
            </Link>
          </span>
        </div>
      </div>
    </>
  );
});
