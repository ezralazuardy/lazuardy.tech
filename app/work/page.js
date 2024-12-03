"use client";

import Maintenance from "@/components/ui/maintenance";
import Loader from "@/components/ui/loader";
import Header from "@/components/ui/work/header";
import React, { useEffect, useState, useRef } from "react";
import { isMaintenanceMode } from "@/lib/config";
import { performHideLoader } from "@/lib/utils";

const loaderDelay = 2000; // in ms;

export default function Page() {
  const header = useRef();
  const loader = useRef();
  const maintenance = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // check if components is ready
    if (!header.current) return;

    // check if the page is loaded
    if (!loaded) {
      setTimeout(() => {
        performHideLoader(loader);
        setLoaded(true);
        header.current.style.top = 0;
      }, loaderDelay);
    }
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
      <Header ref={header} loader={loader} />
      <Loader ref={loader} />
    </>
  );
}