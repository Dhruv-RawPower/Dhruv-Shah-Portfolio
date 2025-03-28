// Chains.jsx
import React, { useMemo, useRef } from 'react';
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

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

// Chain Link Component (with smooth snake animation)
const ChainLink = ({ position, rotation, size, thickness, radius, depth, index, snakeAmplitude, snakeSpeed, snakeFrequency }) => {
  const shape = useMemo(() => createHollowShape(size, thickness, radius), [size, thickness, radius]);
  const extrudeSettings = {
    depth,
    bevelEnabled: true,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  };

  // Ref for animation
  const linkRef = useRef();

  // Snake-like wave animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const waveOffset = index * snakeFrequency; // Creates a delay per link
    const wavePosition = snakeAmplitude * Math.sin(time * snakeSpeed + waveOffset); // Snake wave

    linkRef.current.position.x = wavePosition; // Wave along X-axis (like a snake)
    linkRef.current.rotation.z = wavePosition * 0.05; // Small rotation for realistic sway
  });

  return (
    <mesh
      ref={linkRef}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color={'#4c4c4c'}
        metalness={0.95}
        roughness={0.35}
        envMapIntensity={1.2}
      />
    </mesh>
  );
};

// Main Chain Component with snake-like motion
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
  const chainLinks = [];

  for (let i = 0; i < numLinks; i++) {
    const yOffset = -i * linkSpacing;
    const linkPosition = [0, yOffset, 0];

    const rotation =
      i % 2 === 0
        ? [Math.PI / 2, Math.PI / 2, 0] // Vertical link
        : [Math.PI, 0, 0]; // Horizontal link

    chainLinks.push(
      <ChainLink
        key={i}
        position={linkPosition}
        rotation={rotation}
        size={size}
        thickness={thickness}
        radius={radius}
        depth={depth}
        index={i}
        snakeAmplitude={snakeAmplitude}
        snakeSpeed={snakeSpeed}
        snakeFrequency={snakeFrequency}
      />
    );
  }

  return <group position={position}>{chainLinks}</group>;
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
    <>
      {/* Chain with snake-like wave animation */}
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

    </>
  );
};

export default Chains;
