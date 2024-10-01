"use client";

import Link from "next/link";
import { forwardRef } from "react";

export default forwardRef(function Footer(props, ref) {
  const { className } = props;
  const date = new Date();

  return (
    <div
      ref={ref}
      className={`w-full h-[22vh] grid grid-cols-6 px-12 py-auto text-white border-t-2 border-white bg-black ${className}`}
    >
      <div className="w-full h-full my-auto text-start col-span-4 flex items-center">
        <span className="text-md text-white">
          © LAZUARDY {date.getFullYear()} ALL RIGHTS RESERVED
        </span>
      </div>
      <div className="w-full text-start col-span-1 flex items-center">
        <div>
          <div className="text-white text-md mb-4 font-medium uppercase">
            <span>Follow us</span>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="text-gray-400 text-xs font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link
                  href="https://instagram.com/lazuardy.tech"
                  target="_blank"
                >
                  Instagram
                </Link>
              </div>
              <div className="text-gray-400 text-xs font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link
                  href="https://linkedin.com/company/lazuardy/?viewAsMember=true"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-xs font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link href="https://blog.lazuardy.tech" target="_blank">
                  Medium
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-start col-span-1 flex items-center">
        <div>
          <div className="text-white text-md mb-4 font-medium uppercase">
            <span>Our Address</span>
          </div>
          <div className="text-gray-400 text-xs font-light">
            Menara Suara Merdeka
            <br />
            Jl. Pandanaran No. 30, Semarang
            <br />
            50134 Indonesia
          </div>
        </div>
      </div>
    </div>
  );
});
