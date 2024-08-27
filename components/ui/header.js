"use client";

import Link from "next/link";
import Logo from "@/components/ui/logo";
import { performScrollToTop, performRedirectContact } from "@/lib/utils";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";

export default forwardRef(function Header(props, ref) {
  const { className, loader, scroll } = props;
  const router = useRouter();
  const scrollToTop = () => performScrollToTop(scroll);
  const redirectContact = () => performRedirectContact(router, loader);
  return (
    <div
      ref={ref}
      className={`${className} header transition-all duration-500 absolute left-0 w-full bg-black/30 backdrop-filter backdrop-blur bg-opacity-30 text-white py-8 px-14 grid grid-cols-2 gap-4 ease-in-out pointer-events-auto`}
    >
      <Logo className="w-full text-start text-2xl" />
      <div className="w-full text-end justify-end text-lg font-light font-sans flex">
        <span
          className="text-end font-bold hover:underline hover:cursor-pointer"
          onClick={scrollToTop}
        >
          home
        </span>
        <span
          className="text-end ms-6 hover:underline hover:cursor-pointer"
          onClick={redirectContact}
        >
          contact
        </span>
        <span className="text-end ms-6 hover:underline hover:cursor-pointer">
          <Link href="https://blog.lazuardy.tech" target="_blank">
            articles
          </Link>
        </span>
      </div>
    </div>
  );
});
