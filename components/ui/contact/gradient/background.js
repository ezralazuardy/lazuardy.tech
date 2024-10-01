import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { cnoise21 } from "@/components/ui/gradient/noise";

export default function Background() {
  const target = new THREE.Vector2();
  const shader = {
    uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2() },
    },
    vertexShader,
    fragmentShader,
  };

  useFrame(({ mouse }) => {
    const mouseSensitivity = 1;
    const targetSensitivity = 0.31;
    shader.uniforms.u_time.value += 0.005;
    target.set(
      (mouse.x + mouseSensitivity) * targetSensitivity,
      (mouse.y + mouseSensitivity) * targetSensitivity,
    );
    shader.uniforms.u_mouse.value.lerp(target, 0.2);
  });

  return (
    <Plane args={[2, 2]}>
      <shaderMaterial args={[shader]} />
    </Plane>
  );
}

const vertexShader = `
  varying vec2 v_uv;

  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  varying vec2 v_uv;

  ${cnoise21}

  float random(vec2 p) {
    vec2 k1 = vec2(
      23.14069263277926, // e^pi (Gelfond's constant)
      2.665144142690225 // 2^sqrt(2) (Gelfond–Schneider constant)
    );
    return fract(
      cos(dot(p, k1)) * 12345.6789
    );
  }

  const vec3 black = vec3(0.0);                // Black
  const vec3 color1 = vec3(1.00, 0.40, 0.00);  // Bright Orange
  const vec3 color2 = vec3(0.00, 0.80, 0.80);  // Teal
  const vec3 color3 = vec3(0.00, 0.27, 0.80);  // Royal Blue

  void main() {
    vec2 seed = v_uv * 1.5 * (u_mouse + 0.3 * (length(u_mouse) + 0.5));
    float n = cnoise21(seed) + length(u_mouse) * 0.9;

    float ml = pow(length(u_mouse), 2.5) * 0.15;
    float n1 = smoothstep(0.0, 0.0 + 0.2, n);
    vec3 color = mix(black, color1, n1);

    float n2 = smoothstep(0.1 + ml, 0.1 + ml + 0.2, n);
    color = mix(color, color2, n2);

    float n3 = smoothstep(0.2 + ml, 0.2 + ml + 0.2, n);
    color = mix(color, color3, n3);

    float n4 = smoothstep(0.3 + ml, 0.3 + ml + 0.2, n);
    color = mix(color, black, n4);

    vec2 uvrandom = v_uv;
    uvrandom.y *= random(vec2(uvrandom.y, 0.4));
    color.rgb += random(uvrandom) * 0.05;

    gl_FragColor = vec4(color, 1.0);
  }
`;
