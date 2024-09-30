"use client";

import Link from "next/link";
import Logo from "@/components/ui/logo";
import CanvasGradient from "@/components/ui/work/gradient/canvas-gradient";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import {
  performRedirectHome,
  performRedirectContact,
  performRedirectWork,
  performRedirectPartnership,
} from "@/lib/utils";

export default forwardRef(function Header(props, ref) {
  const { className, loader } = props;
  const router = useRouter();

  return (
    <>
      <div className="relative align-bottom h-[70vh]">
        <div className="absolute inset-0 w-full h-full">
          <CanvasGradient />
        </div>
        <span className="absolute bottom-0 left-0 p-12 text-white font-bold text-8xl pointer-events-none">
          We Seek Different Perspective.
        </span>
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
            onClick={() => performRedirectWork(router, loader)}
          >
            work
          </span>
          <span
            className="text-end transition-colors text-gray-500 font-medium hover:text-white hover:cursor-pointer ms-6"
            onClick={() => performRedirectContact(router, loader)}
          >
            contact
          </span>
          <span className="text-end transition-colors text-gray-500 font-medium hover:text-white hover:cursor-pointer ms-6">
            <Link href="https://blog.lazuardy.tech" target="_blank">
              articles
            </Link>
          </span>
          <span
            className="text-end transition-colors text-gray-500 font-medium hover:text-white hover:cursor-pointer ms-6"
            onClick={() => performRedirectPartnership(router, loader)}
          >
            partnership
          </span>
        </div>
      </div>
    </>
  );
});
