import ShimmerButton from "@/components/magicui/shimmer-button";
import { ArrowUp } from "lucide-react";
import { performScrollToTop } from "@/lib/utils";
import { forwardRef } from "react";

export default forwardRef(function ScrollButton(props, ref) {
  const { className, scroll } = props;
  const scrollToTop = () => performScrollToTop(scroll);
  return (
    <ShimmerButton
      ref={ref}
      className={`scroll-button shadow-2xl absolute bottom-24 right-16 transition-opacity duration-500 ${className}`}
      onClick={scrollToTop}
    >
      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
        <ArrowUp className="w-6 h-6" />
      </span>
    </ShimmerButton>
  );
});
