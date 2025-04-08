import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const aboutLines = [
  "In the depths of the digital realm, where lines of code weave reality,",
  "and imagination collides with innovation, a lone developer embarks on a grand quest.",
  "",
  "With ancient spells of React Three Fiber, and the art of Web Technology,",
  "he conjures immersive worlds, bringing ideas to life through logic.",
  "",
  "Guided by torches of knowledge, he forges through software's labyrinth,",
  "crafting seamless experiences, and elegant solutions.",
  "",
  "The dungeons of tech await…",
  "Will you venture forth?"
];

export default function About({ visible }) {
  if (!visible) return null;

  const torchLeft = useRef();
  const torchRight = useRef();
  const { size: viewport } = useThree();

  const wallWidth = Math.min(8, Math.max(4, viewport.width * 0.8));
  const wallHeight = 5;

  const lineSpacing = 0.25;
  const totalHeight = aboutLines.length * lineSpacing;
  const [baseY, setBaseY] = useState(-2);

  const fontSize = Math.min(0.2, Math.max(0.08, viewport.width * 0.015)); // Responsive font size

  useFrame((_, delta) => {
    // Torch flicker
    const flicker = 2 + Math.sin(Date.now() * 0.005) * 0.6;
    if (torchLeft.current) torchLeft.current.intensity = flicker;
    if (torchRight.current) torchRight.current.intensity = flicker;

    // Vertical scroll
    setBaseY(prev => {
      let next = prev + delta * 0.15;
      if (next > totalHeight / 2) next = -totalHeight / 2;
      return next;
    });
  });

  return (
    <>
      {/* 🧱 Responsive Wall */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[wallWidth, wallHeight]} />
        <meshStandardMaterial color="#6b6b6b" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* 🔥 Flickering Torches */}
      <pointLight ref={torchLeft} position={[-wallWidth / 2 + 0.5, 1.5, -0.8]} intensity={2} color="orange" distance={4} />
      <pointLight ref={torchRight} position={[wallWidth / 2 - 0.5, 1.5, -0.8]} intensity={2} color="orange" distance={4} />

      {/* 🪵 Torch Holders */}
      <mesh position={[-wallWidth / 2 + 0.5, 1, -0.7]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#3b2f2f" />
      </mesh>
      <mesh position={[wallWidth / 2 - 0.5, 1, -0.7]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#3b2f2f" />
      </mesh>

      {/* 📜 Scrolling & Fading Text */}
      {aboutLines.map((line, idx) => {
      const y = baseY + (aboutLines.length - 1 - idx) * lineSpacing;
      if (y > wallHeight / 2.4 || y < -wallHeight / 2) return null;

      const distanceFromCenter = Math.abs(y / (wallHeight / 2));
      const opacity = 1 - Math.pow(distanceFromCenter, 2);

      return (
        <Text
          key={idx}
          position={[0, y, 0]}
          font={`${import.meta.env.BASE_URL}fonts/ElderGodsBB.ttf`}
          fontSize={fontSize}
          maxWidth={wallWidth * 0.8}
          anchorX="center"
          anchorY="middle"
          color={`rgba(218, 165, 32, ${opacity.toFixed(2)})`}
        >
          {line}
        </Text>
      );
      })}
    </>
  );
}
