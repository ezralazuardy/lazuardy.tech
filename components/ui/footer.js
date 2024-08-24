import Link from "next/link";
import Meteors from "@/components/magicui/meteors";
import Marquee from "@/components/magicui/marquee";
import Logo from "@/components/ui/logo";
import { ArrowRight } from "lucide-react";
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
      className={`${className} footer transition-all hidden opacity-0 duration-500 ease-in-out absolute left-0 top-0 w-screen h-screen bg-black`}
    >
      <div className="flex items-center w-full h-full">
        <div className="absolute top-0 left-0 w-screen">
          <Meteors number={30} />
        </div>
        <div className="w-full px-14 text-white">
          <Logo className="w-full text-start text-white text-xl mb-20" />
          <div className="w-full text-start text-white text-4xl mb-10 font-medium uppercase tracking-wide leading-snug">
            <span>
              Ready to build software <br /> that outstands others?
            </span>
          </div>
          <div className="w-full grid grid-cols-8 gap-12">
            <div className="w-full text-start col-span-3">
              <div className="text-gray-300 text-md mb-10 font-light">
                <span>
                  Feel free to reach out if you want to collaborate with us, or
                  simply have a chat.
                </span>
              </div>
              <div className="text-white text-xl font-light flex gap-3">
                <Link href="mailto:contact@lazuardy.tech">
                  contact@lazuardy.tech
                </Link>
                <ArrowRight className="w-6 h-6 mt-1" />
              </div>
            </div>
            <div className="w-full text-start col-span-1"></div>
            <div className="w-full text-start col-span-2">
              <div className="text-white text-md mb-4 font-medium uppercase">
                <span>Partnership</span>
              </div>
              <div className="text-gray-300 text-md font-light">
                Get more profit based on the project value that you can give to
                us, just send an email if you&apos;re interested.
              </div>
            </div>
            <div className="w-full text-start col-span-1">
              <div className="text-white text-md mb-4 font-medium uppercase">
                <span>Follow us</span>
              </div>
              <div className="text-gray-300 text-md font-light mb-2 hover:underline">
                <Link
                  href="https://instagram.com/lazuardy.tech"
                  target="_blank"
                >
                  Instagram
                </Link>
              </div>
              <div className="text-gray-300 text-md font-light mb-2 hover:underline">
                <Link
                  href="https://linkedin.com/company/lazuardy/?viewAsMember=true"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </div>
              <div className="text-gray-300 text-md font-light mb-2 hover:underline">
                <Link href="https://blog.lazuardy.tech" target="_blank">
                  Medium
                </Link>
              </div>
            </div>
            <div className="w-full text-start col-span-1 text-white text-md font-light">
              <div className="text-white font-bold mb-2 hover:underline">
                <Link href="/">home</Link>
              </div>
              <div className="text-gray-300 mb-2 hover:underline">
                <Link href="/contact">contact</Link>
              </div>
              <div className="text-gray-300 mb-2 hover:underline">
                <Link href="https://blog.lazuardy.tech" target="_blank">
                  article
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-screen text-white text-lg font-mono uppercase">
          <Marquee pauseOnHover className="[--duration:20s]">
            {marqueeTexts.map((text, index) => (
              <span key={index} className="me-8 my-4">
                {text}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
});
