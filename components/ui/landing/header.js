"use client";

import Link from "next/link";
import Logo from "@/components/ui/logo";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { performScrollToTop, performRedirectContact } from "@/lib/utils";

export default forwardRef(function Header(props, ref) {
  const { className, loader, scroll } = props;
  const router = useRouter();

  return (
    <div
      ref={ref}
      className={`${className} header transition-all duration-500 absolute left-0 w-full bg-black/30 backdrop-filter backdrop-blur bg-opacity-30 text-white py-6 px-12 grid grid-cols-2 gap-4 ease-in-out pointer-events-auto`}
    >
      <Logo className="w-full text-start text-xl" />
      <div className="w-full text-end justify-end text-lg font-light font-sans flex">
        <span
          className="text-end transition-colors text-white font-medium hover:text-white hover:cursor-pointer"
          onClick={() => performScrollToTop(scroll)}
        >
          home
        </span>
        <span
          className="text-end transition-colors text-gray-400 font-medium hover:text-white hover:cursor-pointer ms-6"
          onClick={() => performRedirectContact(router, loader)}
        >
          contact
        </span>
        <span className="text-end transition-colors text-gray-400 font-medium hover:text-white hover:cursor-pointer ms-6">
          <Link href="https://blog.lazuardy.tech" target="_blank">
            article
          </Link>
        </span>
      </div>
    </div>
  );
});
