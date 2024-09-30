import Background from "@/components/ui/work/gradient/background";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function CanvasGradient() {
  const OrthographicCamera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    -10,
    10,
  );

  return (
    <Canvas camera={OrthographicCamera}>
      <Suspense fallback={null}>
        <Background />
      </Suspense>
    </Canvas>
  );
}
