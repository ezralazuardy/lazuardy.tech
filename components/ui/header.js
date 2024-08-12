import Link from "next/link";
import Logo from "@/components/ui/logo";
import { forwardRef } from "react";

export default forwardRef(function Header(props, ref) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`${className} header transition-all duration-500 absolute left-0 w-full bg-black/30 backdrop-filter backdrop-blur bg-opacity-30 text-white py-8 px-14 grid grid-cols-2 gap-4 ease-in-out`}
    >
      <Logo className="w-full text-start text-2xl" />
      <div className="w-full text-end justify-end text-lg font-light font-sans flex">
        <span className="text-end font-bold">home</span>
        <span className="text-end ms-6">work</span>
        <span className="text-end ms-6">team</span>
        <span className="text-end ms-6">contact</span>
        <span className="text-end ms-6">
          <Link href="https://ezralazuardy.medium.com" target="_blank">
            articles
          </Link>
        </span>
      </div>
    </div>
  );
});