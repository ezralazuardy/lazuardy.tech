import Roboto_Mono from "@/lib/fonts/roboto-mono";
import { forwardRef } from "react";

export default forwardRef(function Maintenance(props, ref) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`${className} maintenance flex justify-center items-center w-screen h-screen bg-red transition-opacity duration-500 top-0 left-0 absolute ease-in-out mx-auto`}
    >
      <div
        className={`text-center lowercase pb-6 text-white text-xl animate-pulse font-semibold ${Roboto_Mono.className} ${className}`}
      >
        we are still under maintenance.
      </div>
    </div>
  );
});
