import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const performScrollToTop = (scroll) => {
  scroll.current.scrollTo({ top: 0, behavior: "smooth" });
};

export const performScrollToBottom = (scroll) => {
  scroll.current.scrollTo({
    top: scroll.current.scrollHeight,
    behavior: "smooth",
  });
};

export const performShowLoader = (loader) => {
  if (!loader || !loader.current) return;
  loader.current.style.opacity = 0;
  loader.current.style.top = "0vh";
  loader.current.style.opacity = 100;
};

export const performHideLoader = (loader) => {
  if (!loader || !loader.current) return;
  loader.current.style.opacity = 0;
  setTimeout(() => {
    loader.current.style.top = "-100vh";
  }, 700);
};

export const performRedirectHome = (router, loader) => {
  performShowLoader(loader);
  setTimeout(() => router.push("/"));
};

export const performRedirectWork = (router, loader) => {
  performShowLoader(loader);
  setTimeout(() => router.push("/work"));
};

export const performRedirectContact = (router, loader) => {
  performShowLoader(loader);
  setTimeout(() => router.push("/contact"));
};

export const performRedirectPartnership = (router, loader) => {
  performShowLoader(loader);
  setTimeout(() => router.push("/partnership"));
};
