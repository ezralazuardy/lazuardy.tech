import Logo from "@/components/ui/logo";
import { forwardRef } from "react";

export default forwardRef(function Loader(props, ref) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`${className} loader flex justify-center items-center w-screen h-screen bg-red transition-opacity duration-500 top-0 left-0 absolute ease-in-out`}
    >
      <div className="pb-6">
        <Logo className="text-white text-xl animate-pulse" />
      </div>
    </div>
  );
});
