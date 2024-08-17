"use client";

import Header from "@/components/ui/header";
import Canvas from "@/components/ui/canvas";
import Footer from "@/components/ui/footer";
import Loader from "@/components/ui/loader";
import React, { useEffect, useState, useRef } from "react";
import state from "@/lib/state";

const loaderDelay = 4000; // in ms;

export default function Page() {
  const scroll = useRef();
  const canvas = useRef();
  const header = useRef();
  const footer = useRef();
  const loader = useRef();
  const [loaded, setLoaded] = useState(false);

  const calculateScrollProgress = (scrollTarget) => {
    const scrollHeight = scrollTarget.scrollHeight - scrollTarget.clientHeight;
    const scrollPosition = scrollTarget.scrollTop;
    const scrollPercent = (scrollPosition / scrollHeight) * 100;
    state.top = scrollPosition;

    return parseInt(isNaN(scrollPercent) ? 0 : scrollPercent);
  };

  const onScroll = (e) => {
    // get the scroll target
    let scrollTarget = e.target;

    // make sure component is loaded
    if (
      // !header.current ||
      // !footer.current ||
      // !loader.current ||
      !scrollTarget
    ) {
      return;
    }

    // get the scroll data
    const scrollProgress = calculateScrollProgress(scrollTarget);

    // check if the page is loaded
    if (!loaded) {
      setTimeout(() => {
        setLoaded(true);
        loader.current.style.opacity = 0;
        setTimeout(() => {
          loader.current.style.display = "none";
        }, 700);
      }, loaderDelay);
    }

    if (scrollProgress >= 80) {
      footer.current.classList.remove("hidden");
      setTimeout(() => {
        footer.current.style.opacity = 100;
      }, 500);
    } else {
      footer.current.style.opacity = 0;
      setTimeout(() => {
        footer.current.classList.add("hidden");
      }, 500);
    }

    if (scrollProgress <= 3) {
      header.current.style.top = "0px";
      return;
    }

    if (scrollProgress > 3) {
      header.current.style.top = "-500px";
      return;
    }
  };

  useEffect(() => onScroll({ target: scroll.current }));

  // return (
  //   <>
  //     <Footer ref={footer} />
  //   </>
  // );

  return (
    <>
      <Canvas ref={scroll} onScroll={onScroll} />
      <Header ref={header} />
      <Footer ref={footer} />
      <Loader ref={loader} />
    </>
  );
}
