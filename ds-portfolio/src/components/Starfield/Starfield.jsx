import {  useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

const TwinklingStars = ({ numStars = 1000 }) => {
  const pointsRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (pointsRef.current) {
      const material = pointsRef.current.material;
      
      // Update size and opacity for twinkle effect
      material.size = 0.1 + 0.05 * Math.sin(time * 2); // Oscillate size
      material.opacity = 0.8 + 0.2 * Math.sin(time * 3); // Vary brightness/emission
    }
  });

  const positions = useMemo(() => {
    const positions = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      positions.set(
        [
          (Math.random() - 0.5) * 100,
          (Math.random() * 98) + 2,
          (Math.random() - 0.5) * 100,
        ],
        i * 3
      );
    }
    return positions;
  }, [numStars]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={numStars}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.2} // Initial size
        transparent
        depthWrite={false}
        opacity={0.8} // Initial opacity
        sizeAttenuation={true}
        color="#ffffff"
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
};

export default function App() {
  return (
      <TwinklingStars numStars={1000} />
  );
}
