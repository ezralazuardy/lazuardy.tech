"use client";

import * as THREE from "three";
import Effect from "@/components/ui/landing/effect";
import Text from "@/components/ui/landing/text";
import state from "@/lib/state";
import { Flex, Box, useFlexSize } from "@react-three/flex";
import { Line, useAspect } from "@react-three/drei";
import {
  Canvas as FiberCanvas,
  useThree,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import React, {
  Suspense,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  forwardRef,
} from "react";

function HeightReporter({ onReflow }) {
  const size = useFlexSize();
  useLayoutEffect(() => onReflow && onReflow(...size), [onReflow, size]);
  return null;
}

function Page({ text, images, textScaleFactor, onReflow, left = false }) {
  const textures = useLoader(THREE.TextureLoader, images);
  const { viewport } = useThree();
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 2.4,
    marginLeft: left * 1,
    marginRight: !left * 1,
    width: "auto",
    height: "auto",
    minWidth: 3,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 6,
  };
  return (
    <Box
      dir="column"
      align={left ? "flex-start" : "flex-end"}
      justify="flex-start"
      width="100%"
      height="auto"
      minHeight="100%"
    >
      <HeightReporter onReflow={onReflow} />
      <Box
        dir="row"
        width="100%"
        height="auto"
        justify={left ? "flex-end" : "flex-start"}
        margin={0}
        grow={1}
        wrap="wrap"
      >
        {textures.map((texture, index) => (
          <Box key={index} {...boxProps}>
            {(width, height) => (
              <mesh>
                <planeBufferGeometry args={[width, height]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
              </mesh>
            )}
          </Box>
        ))}
      </Box>
      <Box
        marginLeft={left ? 1.5 : 1}
        marginRight={left ? 1 : 1.5}
        marginBottom={1}
      >
        <Text
          bold
          position-z={0.5}
          textAlign={left ? "left" : "right"}
          fontSize={1.5 * textScaleFactor}
          lineHeight={1}
          letterSpacing={-0.05}
          color="white"
          maxWidth={(viewport.width / 4) * 3}
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
}

function Layercard({
  depth,
  boxWidth,
  boxHeight,
  text,
  textColor,
  color,
  map,
  textScaleFactor,
}) {
  const ref = useRef();
  const { viewport, size } = useThree();
  const pageLerp = useRef(state.top / size.height);
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      state.top / size.height,
      0.15,
    ));
    if (depth >= 0)
      ref.current.opacity =
        page < state.threshold * 1.7 ? 1 : 1 - (page - state.threshold * 1.7);
  });
  return (
    <>
      <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
        <planeBufferGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial
          ref={ref}
          color={color}
          map={map}
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>
      <Text
        bold
        position={[boxWidth / 2, -boxHeight / 2, depth + 1.5]}
        maxWidth={(viewport.width / 4) * 1}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        fontSize={0.6 * textScaleFactor}
        lineHeight={1}
        letterSpacing={-0.05}
        color={textColor}
      >
        {text}
      </Text>
    </>
  );
}

function Content({ onReflow }) {
  const group = useRef();
  const { viewport, size } = useThree();
  const [bW, bH] = useAspect(1920, 1920, 0.5);
  const texture = useLoader(THREE.TextureLoader, state.depthbox[0].image);
  const vec = new THREE.Vector3();
  const pageLerp = useRef(state.top / size.height);
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      state.top / size.height,
      0.15,
    ));
    const y = page * viewport.height;
    const sticky = state.threshold * viewport.height;
    group.current.position.lerp(
      vec.set(
        0,
        page < state.threshold ? y : sticky,
        page < state.threshold ? 0 : page * 1.25,
      ),
      0.15,
    );
  });
  const handleReflow = useCallback(
    (w, h) => onReflow((state.pages = h / viewport.height + 5.5)),
    [onReflow, viewport.height],
  );
  const sizesRef = useRef([]);
  const scale = Math.min(1, viewport.width / 16);
  return (
    <group ref={group}>
      <Flex
        dir="column"
        position={[-viewport.width / 2, viewport.height / 2, 0]}
        size={[viewport.width, viewport.height, 0]}
        onReflow={handleReflow}
      >
        {state.content.map((props, index) => (
          <Page
            key={index}
            left={!(index % 2)}
            textScaleFactor={scale}
            onReflow={(w, h) => {
              sizesRef.current[index] = h;
              state.threshold = Math.max(
                4,
                (4 / (15.8 * 3)) *
                  sizesRef.current.reduce((acc, e) => acc + e, 0),
              );
            }}
            {...props}
          />
        ))}
        <Box
          dir="row"
          width="100%"
          height="100%"
          align="center"
          justify="center"
        >
          <Box centerAnchor>
            {state.lines.map((props, index) => (
              <Line key={index} {...props} />
            ))}
            <Text
              bold
              position-z={0.5}
              anchorX="center"
              anchorY="middle"
              fontSize={1.5 * scale}
              lineHeight={1}
              letterSpacing={-0.05}
              color="white"
              maxWidth={(viewport.width / 4) * 3}
            >
              {state.depthbox[0].text}
            </Text>
          </Box>
        </Box>
        <Box
          dir="row"
          width="100%"
          height="100%"
          align="center"
          justify="center"
        >
          <Box>
            <Layercard
              {...state.depthbox[0]}
              text={state.depthbox[1].text}
              boxWidth={bW}
              boxHeight={bH}
              map={texture}
              textScaleFactor={scale}
            />
          </Box>
        </Box>
      </Flex>
    </group>
  );
}

export default forwardRef(function Canvas(props, ref) {
  const { onScroll } = props;
  const [pages, setPages] = useState(0);
  return (
    <>
      <FiberCanvas
        dpr={[1, 2]}
        raycaster={{ enabled: false }}
        camera={{ position: [0, 0, 10], far: 2000 }}
        onCreated={({ gl }) => gl.setClearColor("#000000")}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <Suspense fallback={null}>
          <Content onReflow={setPages} />
        </Suspense>
        <Effect />
      </FiberCanvas>
      <div
        className="scrollArea pointer-events-auto"
        ref={ref}
        onScroll={onScroll}
        onPointerMove={(e) =>
          (state.mouse = [
            (e.clientX / window.innerWidth) * 2 - 1,
            (e.clientY / window.innerHeight) * 2 - 1,
          ])
        }
      >
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
});
