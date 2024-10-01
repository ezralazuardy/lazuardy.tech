"use client";

import Maintenance from "@/components/ui/maintenance";
import Loader from "@/components/ui/loader";
import Header from "@/components/ui/landing/header";
import Canvas from "@/components/ui/landing/canvas";
import Footer from "@/components/ui/landing/footer";
import ScrollButton from "@/components/ui/landing/scroll-button";
import React, { useEffect, useState, useRef } from "react";
import { isMaintenanceMode } from "@/lib/config";
import { performHideLoader } from "@/lib/utils";
import state from "@/lib/state";

const loaderDelay = 2000; // in ms;

const calculateScrollProgress = (scrollTarget) => {
  const scrollHeight = scrollTarget.scrollHeight - scrollTarget.clientHeight;
  const scrollPosition = scrollTarget.scrollTop;
  const scrollPercent = (scrollPosition / scrollHeight) * 100;
  state.top = scrollPosition;

  return parseInt(isNaN(scrollPercent) ? 0 : scrollPercent);
};

const hideLoader = (loader) => performHideLoader(loader);

export default function Page() {
  const scroll = useRef();
  const scrollButton = useRef();
  const header = useRef();
  const footer = useRef();
  const loader = useRef();
  const maintenance = useRef();
  const [loaded, setLoaded] = useState(false);

  const onScroll = () => {
    // get the scroll target
    let scrollTarget = scroll.current;

    // make sure component is loaded
    if (
      !header.current ||
      !footer.current ||
      !loader.current ||
      !scrollButton.current ||
      !scrollTarget
    ) {
      return;
    }

    console.log(scrollButton.current.onClick ?? false);

    // get the scroll data
    const scrollProgress = calculateScrollProgress(scrollTarget);

    // check if the page is loaded
    if (!loaded) {
      setTimeout(() => {
        hideLoader(loader);
        setLoaded(true);
      }, loaderDelay);
    }

    // show/hide the footer
    if (scrollProgress >= 82) {
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

    // show the header and hide the scroll button
    if (scrollProgress <= 3) {
      header.current.style.top = "0px";
      scrollButton.current.style.opacity = 0;
      setTimeout(() => {
        scrollButton.current.classList.add("hidden");
        scrollButton.current.onClick = false;
      }, 500);
      return;
    }

    // hide the header and show the scroll button
    if (scrollProgress > 3) {
      header.current.style.top = "-500px";
      if ((scrollButton.current.onClick ?? false) === false) {
        scrollButton.current.classList.remove("hidden");
        setTimeout(() => {
          scrollButton.current.style.opacity = 100;
        }, 500);
      }
      return;
    }
  };

  useEffect(() => {
    // listen for scroll events
    onScroll();
  });

  if (isMaintenanceMode()) {
    return (
      <>
        <Maintenance ref={maintenance} />
      </>
    );
  }

  return (
    <>
      <Canvas ref={scroll} onScroll={onScroll} />
      <Header ref={header} loader={loader} scroll={scroll} />
      <Footer ref={footer} loader={loader} scroll={scroll} />
      <ScrollButton ref={scrollButton} scroll={scroll} />
      <Loader ref={loader} />
    </>
  );
}
