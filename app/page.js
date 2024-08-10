"use client";

import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Flex, Box, useFlexSize } from "@react-three/flex";
import { Loader, Line, useAspect } from "@react-three/drei";
import Effect from "@/components/effect";
import Text from "@/components/text";
import state from "@/components/state";
import Link from "next/link";
import Meteors from "@/components/magicui/meteors";
import Marquee from "@/components/magicui/marquee";

const footerMarquees = [
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
          color="black"
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
              color="black"
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

export default function Home() {
  const scrollArea = useRef();
  const header = useRef();
  const footer = useRef();
  const scheduleForm = useRef();
  const onScroll = (e) => {
    state.top = e.target.scrollTop;
    if (e.target.scrollTop < 600) {
      header.current.style.top = "0px";
    } else if (e.target.scrollTop > 6000) {
      // header.current.style.top = "0px";
      footer.current.style.bottom = "0px";
      scheduleForm.current.style.opacity = "1";
    } else {
      header.current.style.top = "-1000px";
      footer.current.style.bottom = "-1000px";
      scheduleForm.current.style.opacity = "0";
    }
  };
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  const [pages, setPages] = useState(0);
  return (
    <>
      <Canvas
        shadows
        raycaster={{ enabled: false }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
        onCreated={({ gl }) => gl.setClearColor("#f5f5f5")}
      >
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <ambientLight intensity={0.4} />
        <spotLight
          castShadow
          angle={0.3}
          penumbra={1}
          position={[0, 10, 20]}
          intensity={5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Content onReflow={setPages} />
        </Suspense>
        <Effect />
      </Canvas>
      <div
        className="scrollArea"
        ref={scrollArea}
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
      <div
        ref={header}
        className="header transition-all duration-1000 absolute left-0 w-full bg-white/30 backdrop-filter backdrop-blur bg-opacity-30 text-black py-8 px-14 grid grid-cols-2 gap-4"
      >
        <div className="w-full text-start text-xl font-semibold font-mono">
          <span>lazuardy;</span>
        </div>
        <div className="w-full text-end justify-end text-lg font-light font-sans flex">
          <span className="text-end no-underline font-bold me-6">home</span>
          <span className="text-end no-underline me-6">work</span>
          <span className="text-end no-underline me-6">team</span>
          <span className="text-end no-underline me-6">contact</span>
          <span className="text-end no-underline">
            <Link href="https://ezralazuardy.medium.com" target="_blank">
              articles
            </Link>
          </span>
        </div>
      </div>
      <div
        ref={footer}
        className="footer transition-all duration-1000 absolute left-0 w-full bg-black text-white pt-8"
      >
        <div className="relative w-full h-full">
          <Meteors number={30} />
        </div>
        <div className="w-full px-14 text-start text-white text-xl mb-20 font-semibold font-mono mt-40">
          <span>lazuardy;</span>
        </div>
        <div className="w-full px-14 text-start text-white text-4xl mb-10 font-medium uppercase tracking-wide leading-snug">
          <span>
            Ready to build software <br /> that outstands others?
          </span>
        </div>
        <div className="w-full px-14 grid grid-cols-8 gap-12 mb-40">
          <div className="w-full text-start col-span-3">
            <div className="text-gray-300 text-md mb-10 font-light">
              <span>
                Feel free to reach out if you want to collaborate with us, or
                simply have a chat.
              </span>
            </div>
            <div className="text-white text-xl font-light">
              <Link href="mailto:contact@lazuardy.tech">
                contact@lazuardy.tech
              </Link>
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
            <div className="text-gray-300 text-md font-light mb-2">
              Instagram
            </div>
            <div className="text-gray-300 text-md font-light mb-2">
              LinkedIn
            </div>
            <div className="text-gray-300 text-md font-light mb-2">Medium</div>
          </div>
          <div className="w-full text-start col-span-1 text-white text-md font-light">
            <div className="text-white no-underline font-bold mb-2">home</div>
            <div className="text-gray-300 no-underline mb-2">work</div>
            <div className="text-gray-300 no-underline mb-2">team</div>
            <div className="text-gray-300 no-underline mb-2">contact</div>
            <div className="text-gray-300 no-underline mb-2">articles</div>
          </div>
        </div>
        <div className="w-full">
          <Marquee pauseOnHover className="[--duration:20s]">
            {footerMarquees.map((text, index) => (
              <span
                key={index}
                className="text-white text-lg font-mono me-8 my-4 uppercase"
              >
                {text}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
      <div
        ref={scheduleForm}
        className="schedule-form hidden transition-all duration-1000 absolute inset-0 opacity-0 w-full bg-transparent text-white py-2"
      ></div>
      <Loader />
    </>
  );
}
