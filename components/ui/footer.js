import Link from "next/link";
import Meteors from "@/components/magicui/meteors";
import Marquee from "@/components/magicui/marquee";
import Logo from "@/components/ui/logo";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";
import { performRedirectContact, performRedirectHome } from "@/lib/utils";

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
  "Design",
  "DevOps",
  "Internet of Things",
  "UI/UX",
];

export default forwardRef(function Footer(props, ref) {
  const { className, loader } = props;
  const redirectHome = () => performRedirectHome(loader);
  const redirectContact = () => performRedirectContact(loader);
  return (
    <div
      ref={ref}
      className={`${className} footer transition-all hidden opacity-0 duration-500 ease-in-out absolute left-0 top-0 w-screen h-screen bg-black`}
    >
      <div className="flex items-center w-full h-full">
        <div className="absolute top-0 left-0 w-screen">
          <Meteors number={30} />
        </div>
        <div className="w-full px-16 mb-16 text-white">
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
              <div className="text-white text-xl font-light flex gap-2 hover:gap-4 transition-all">
                <Link href="mailto:contact@lazuardy.tech">
                  contact@lazuardy.tech
                </Link>
                <ArrowRight className="w-5 h-5 mt-1.5" />
              </div>
            </div>
            <div className="w-full text-start col-span-1"></div>
            <div className="w-full text-start col-span-2 pt-2">
              <div className="text-white text-md mb-4 font-medium uppercase">
                <span>Our Address</span>
              </div>
              <div className="text-gray-400 text-md font-light">
                Menara Suara Merdeka
                <br />
                Jl. Pandanaran No.30
                <br />
                Semarang, 50134
                <br />
                Indonesia
              </div>
            </div>
            <div className="w-full text-start col-span-1 pt-2">
              <div className="text-white text-md mb-4 font-medium uppercase">
                <span>Follow us</span>
              </div>
              <div className="text-gray-400 text-md font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link
                  href="https://instagram.com/lazuardy.tech"
                  target="_blank"
                >
                  Instagram
                </Link>
              </div>
              <div className="text-gray-400 text-md font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link
                  href="https://linkedin.com/company/lazuardy/?viewAsMember=true"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </div>
              <div className="text-gray-400 text-md font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link href="https://blog.lazuardy.tech" target="_blank">
                  Medium
                </Link>
              </div>
            </div>
            <div className="w-full text-start col-span-1 pt-2 text-white text-md font-light">
              <div
                className="text-white font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer"
                onClick={redirectHome}
              >
                <span className="text-white text-xs mr-2">▶</span>
                <span>home</span>
              </div>
              <div
                className="text-gray-400 font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer"
                onClick={redirectContact}
              >
                <span className="text-black text-xs mr-2">▶</span>
                <span>contact</span>
              </div>
              <div className="text-gray-400 font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer">
                <Link href="https://blog.lazuardy.tech" target="_blank">
                  <span className="text-black text-xs mr-2">▶</span>
                  <span>articles</span>
                </Link>
              </div>
              <div
                className="text-gray-400 font-medium mb-2 transition-colors hover:text-white hover:cursor-pointer"
                onClick={redirectContact}
              >
                <span className="text-black text-xs mr-2">▶</span>
                <span>partnership</span>
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
