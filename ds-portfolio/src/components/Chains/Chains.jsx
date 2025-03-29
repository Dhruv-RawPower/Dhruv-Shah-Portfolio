// Chains.jsx
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


// Create a hollow, rounded box shape for realistic chain links
const createHollowShape = (size, thickness, radius) => {
  const outerShape = new THREE.Shape();
  const halfSize = size / 2;

  // Outer rounded rectangle shape
  outerShape.absarc(-halfSize + radius, -halfSize + radius, radius, Math.PI, 1.5 * Math.PI);
  outerShape.lineTo(halfSize - radius, -halfSize);
  outerShape.absarc(halfSize - radius, -halfSize + radius, radius, 1.5 * Math.PI, 0);
  outerShape.lineTo(halfSize, halfSize - radius);
  outerShape.absarc(halfSize - radius, halfSize - radius, radius, 0, 0.5 * Math.PI);
  outerShape.lineTo(-halfSize + radius, halfSize);
  outerShape.absarc(-halfSize + radius, halfSize - radius, radius, 0.5 * Math.PI, Math.PI);

  // Inner cutout to make it hollow
  const innerSize = size - thickness;
  const innerRadius = radius * 0.7;
  const holePath = new THREE.Path();

  holePath.absarc(-innerSize / 2 + innerRadius, -innerSize / 2 + innerRadius, innerRadius, Math.PI, 1.5 * Math.PI);
  holePath.lineTo(innerSize / 2 - innerRadius, -innerSize / 2);
  holePath.absarc(innerSize / 2 - innerRadius, -innerSize / 2 + innerRadius, innerRadius, 1.5 * Math.PI, 0);
  holePath.lineTo(innerSize / 2, innerSize / 2 - innerRadius);
  holePath.absarc(innerSize / 2 - innerRadius, innerSize / 2 - innerRadius, innerRadius, 0, 0.5 * Math.PI);
  holePath.lineTo(-innerSize / 2 + innerRadius, innerSize / 2);
  holePath.absarc(-innerSize / 2 + innerRadius, innerSize / 2 - innerRadius, innerRadius, 0.5 * Math.PI, Math.PI);

  outerShape.holes.push(holePath);
  return outerShape;
};

// Pre-compute geometry and material once
const useChainGeometry = (size, thickness, radius, depth) => {
  const shape = useMemo(() => createHollowShape(size, thickness, radius), [size, thickness, radius]);
  const extrudeSettings = useMemo(
    () => ({
      depth,
      bevelEnabled: true,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    }),
    [depth]
  );

  const geometry = useMemo(() => new THREE.ExtrudeGeometry(shape, extrudeSettings), [shape, extrudeSettings]);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4c4c4c",
        metalness: 0.95,
        roughness: 0.35,
        envMapIntensity: 1.2,
      }),
    []
  );

  return { geometry, material };
};

// Main Chain Component with Instancing for Better Performance
const Chain = ({
  numLinks,
  linkSpacing,
  size,
  thickness,
  radius,
  depth,
  position,
  snakeAmplitude,
  snakeSpeed,
  snakeFrequency,
}) => {
  const { geometry, material } = useChainGeometry(size, thickness, radius, depth);
  const instancedRef = useRef();

  // Precompute positions and rotations to avoid recalculating
  const linkTransforms = useMemo(() => {
    return Array.from({ length: numLinks }).map((_, i) => {
      const yOffset = -i * linkSpacing;
      const linkPosition = new THREE.Vector3(0, yOffset, 0);
      const linkRotation = i % 2 === 0 ? new THREE.Euler(Math.PI / 2, Math.PI / 2, 0) : new THREE.Euler(Math.PI, 0, 0);
      return { position: linkPosition, rotation: linkRotation };
    });
  }, [numLinks, linkSpacing]);

  // Snake-like wave animation using instancing
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (instancedRef.current) {
      for (let i = 0; i < numLinks; i++) {
        const { position, rotation } = linkTransforms[i];
        const waveOffset = i * snakeFrequency; // Creates a delay per link
        const wavePosition = snakeAmplitude * Math.sin(time * snakeSpeed + waveOffset);

        const matrix = new THREE.Matrix4();
        matrix.compose(
          new THREE.Vector3(wavePosition, position.y, position.z),
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(rotation.x, rotation.y, wavePosition * 0.05) // Add slight rotation for realism
          ),
          new THREE.Vector3(1, 1, 1)
        );

        instancedRef.current.setMatrixAt(i, matrix);
      }
      instancedRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={instancedRef} args={[geometry, material, numLinks]} position={position} frustumCulled={true} castShadow receiveShadow />
  );
};

// Main Chains Component with Snake Props
const Chains = ({
  numLinks = 30, // Number of links
  linkSpacing = 0.3, // Space between links
  size = 0.3, // Size of each link
  thickness = 0.08, // Thickness of the links
  radius = 0.05, // Corner radius for smooth links
  depth = 0.1, // Depth of each link
  position = [0, 0, 0], // Position of the entire chain
  snakeAmplitude = 0.2, // Amplitude of snake wave
  snakeSpeed = 2.0, // Speed of the snake wave
  snakeFrequency = 0.25, // Frequency of the wave per link
}) => {
  return (
    <Chain
      numLinks={numLinks}
      linkSpacing={linkSpacing}
      size={size}
      thickness={thickness}
      radius={radius}
      depth={depth}
      position={position}
      snakeAmplitude={snakeAmplitude}
      snakeSpeed={snakeSpeed}
      snakeFrequency={snakeFrequency}
    />
  );
};

export default Chains;
