import { ArrowUp } from "lucide-react";
import { performScrollToTop } from "@/lib/utils";
import { forwardRef } from "react";

export default forwardRef(function ScrollButton(props, ref) {
  const { className, scroll } = props;
  const scrollToTop = () => {
    ref.current.onClick = true;
    ref.current.style.opacity = 0;
    performScrollToTop(scroll);
  };

  return (
    <span
      ref={ref}
      onClick={scrollToTop}
      className={`scroll-button absolute bottom-24 right-16 transition-opacity duration-500 text-center text-black w-14 h-14 bg-white rounded-full flex items-center hover:cursor-pointer ${className}`}
    >
      <ArrowUp className="w-6 h-6 mx-auto" />
    </span>
  );
});
