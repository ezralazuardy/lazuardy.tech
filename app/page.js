"use client";

import Header from "@/components/ui/header";
import Canvas from "@/components/ui/canvas";
import Footer from "@/components/ui/footer";
import Loader from "@/components/ui/loader";
import React, { useEffect, useState, useRef } from "react";
import state from "@/lib/state";

export default function Page() {
  const scrollArea = useRef();
  const header = useRef();
  const footer = useRef();
  const loader = useRef();
  const [loaded, setLoaded] = useState(false);
  const onScroll = (e) => {
    // make sure component is loaded
    if (!e || !header.current || !footer.current || !loader.current) return;

    // get the scroll position
    state.top = e.target.scrollTop;

    // calulate the scroll percentage
    const scrollHeight = e.target.scrollHeight - e.target.clientHeight;
    const scrollPosition = state.top;
    let scrollPercent = (scrollPosition / scrollHeight) * 100;
    scrollPercent = parseInt(isNaN(scrollPercent) ? 0 : scrollPercent);
    console.log(scrollPercent);

    // check if the page is loaded
    if (!loaded) {
      setTimeout(() => {
        setLoaded(true);
        loader.current.style.opacity = 0;
        setTimeout(() => {
          loader.current.style.display = "none";
        }, 1000);
      }, 2000);
    }

    // show/hide header and footer
    if (scrollPercent <= 4) {
      header.current.style.top = "0px";
    } else if (scrollPercent >= 74) {
      footer.current.style.bottom = "0px";
    } else {
      header.current.style.top = "-500px";
      footer.current.style.bottom = "-1000px";
    }
  };

  useEffect(() => onScroll({ target: scrollArea.current }));

  return (
    <>
      <Canvas ref={scrollArea} onScroll={onScroll} />
      <Header ref={header} />
      <Footer ref={footer} />
      <Loader ref={loader} />
    </>
  );
}
