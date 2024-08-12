import Link from "next/link";
import Meteors from "@/components/magicui/meteors";
import Marquee from "@/components/magicui/marquee";
import Logo from "@/components/ui/logo";
import { forwardRef } from "react";

const marqueeTexts = [
  "Artificial Intelligence",
  "Machine Learning",
  "Big Data",
  "Algorithm",
  "Frontend",
  "Backend",
  "Web 3",
  "Cloud",
  "Network",
  "Cybersecurity",
  "DevOps",
  "Internet of Things",
];

export default forwardRef(function Footer(props, ref) {
  const { className } = props;
  return (
    <div
      ref={ref}
      className={`${className} footer transition-all duration-700 absolute left-0 w-full bg-black text-white pt-8 ease-in-out`}
    >
      <div className="relative w-full h-full">
        <Meteors number={30} />
      </div>
      <Logo className="w-full px-14 text-start text-white text-xl mb-20 mt-40" />
      <div className="w-full px-14 text-start text-white text-4xl mb-10 font-medium uppercase tracking-wide leading-snug">
        <span>
          Ready to build software <br /> that outstands others?
        </span>
      </div>
      <div className="w-full px-14 grid grid-cols-8 gap-12 mb-40">
        <div className="w-full text-start col-span-3">
          <div className="text-gray-300 text-md mb-10 font-light">
            <span>
              Feel free to reach out if you want to collaborate with us, or
              simply have a chat.
            </span>
          </div>
          <div className="text-white text-xl font-light">
            <Link href="mailto:contact@lazuardy.tech">
              contact@lazuardy.tech
            </Link>
          </div>
        </div>
        <div className="w-full text-start col-span-1"></div>
        <div className="w-full text-start col-span-2">
          <div className="text-white text-md mb-4 font-medium uppercase">
            <span>Partnership</span>
          </div>
          <div className="text-gray-300 text-md font-light">
            Get more profit based on the project value that you can give to us,
            just send an email if you&apos;re interested.
          </div>
        </div>
        <div className="w-full text-start col-span-1">
          <div className="text-white text-md mb-4 font-medium uppercase">
            <span>Follow us</span>
          </div>
          <div className="text-gray-300 text-md font-light mb-2">Instagram</div>
          <div className="text-gray-300 text-md font-light mb-2">LinkedIn</div>
          <div className="text-gray-300 text-md font-light mb-2">Medium</div>
        </div>
        <div className="w-full text-start col-span-1 text-white text-md font-light">
          <div className="text-white font-bold mb-2">home</div>
          <div className="text-gray-300 mb-2">work</div>
          <div className="text-gray-300 mb-2">team</div>
          <div className="text-gray-300 mb-2">contact</div>
          <div className="text-gray-300 mb-2">articles</div>
        </div>
      </div>
      <div className="w-full">
        <Marquee pauseOnHover className="[--duration:20s]">
          {marqueeTexts.map((text, index) => (
            <span
              key={index}
              className="text-white text-lg font-mono me-8 my-4 uppercase"
            >
              {text}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
});
