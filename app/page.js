"use client";

import Header from "@/components/ui/header";
import Canvas from "@/components/ui/canvas";
import Footer from "@/components/ui/footer";
import Loader from "@/components/ui/loader";
import Maintenance from "@/components/ui/maintenance";
import React, { useEffect, useState, useRef } from "react";
import { isMaintenanceMode } from "@/lib/config";
import { performHideLoader } from "@/lib/utils";
import state from "@/lib/state";

const loaderDelay = 5000; // in ms;

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
      !scrollTarget
    ) {
      return;
    }

    // get the scroll data
    const scrollProgress = calculateScrollProgress(scrollTarget);

    // check if the page is loaded
    if (!loaded) {
      setTimeout(() => {
        hideLoader(loader);
        setLoaded(true);
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

  useEffect(() => onScroll());

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
      <Loader ref={loader} />
    </>
  );
}
