import { useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Text, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const PROFILE = {
  name: "Creative Front End Engineer",
  title: "Currently working at Hexaware Technologies",
  bullets: [
    "React | Next.js | R3F",
    "Javascript Enthusiast",
    "PostgreSQL | Supabase",
    "3D UX + AI Integration",
    "University of Salford",
    "M.Sc. Managing Innovation and Information Technology"
  ]
};

export default function About({ visible }) {
  const { size: vp } = useThree();
  const ringGroup = useRef();
  const radius = 2.6;
  const angleStep = (2 * Math.PI) / PROFILE.bullets.length;
  const textSize = 0.18;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useFrame((_, delta) => {
    if (ringGroup.current && !isPaused) {
      ringGroup.current.rotation.y += delta * 0.25;
    }
  });

  return (
    visible && (
      <group>
        {/* ✨ Sparkles */}
        <Sparkles
          count={60}
          scale={[6, 6, 2]}
          size={1.5}
          speed={0.5}
          color="#ffaa33"
          position={[0, 1.2, 0]}
        />

        {/* 🪄 Rune Circle Base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <ringGeometry args={[1.8, 2.5, 64]} />
          <meshStandardMaterial
            color="#ffaa33"
            emissive="#ffaa33"
            emissiveIntensity={0.6}
            roughness={0.5}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 🔥 Side Torches */}
        <pointLight position={[-4, 2, 2]} intensity={1.8} color="orange" distance={7} decay={2} />
        <pointLight position={[4, 2, 2]} intensity={1.8} color="orange" distance={7} decay={2} />

        {/* 👑 Name in Center */}
        <Float floatIntensity={1} rotationIntensity={0.3} speed={2}>
          <Text
            font={`${import.meta.env.BASE_URL}fonts/ElderGodsBB.ttf`}
            position={[0, 1.5, 0]}
            fontSize={0.5}
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
          >
            {PROFILE.name}
          </Text>
          <Text
            font={`${import.meta.env.BASE_URL}fonts/ElderGodsBB.ttf`}
            position={[0, 1.1, 0]}
            fontSize={0.22}
            anchorX="center"
            anchorY="middle"
            color="#ffcc66"
          >
            {PROFILE.title}
          </Text>
        </Float>

        {/* 🌀 Rotating Circular Tech Labels */}
        <group ref={ringGroup}>
          {PROFILE.bullets.map((line, i) => {
            const angle = i * angleStep;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            const rotationY = -angle + Math.PI / 2;

            const isHovered = hoveredIndex === i;

            return (
              <Float floatIntensity={0.6} rotationIntensity={0.2} key={i}>
                <Text
                  font={`${import.meta.env.BASE_URL}fonts/ElderGodsBB.ttf`}
                  position={[x, 0, z]}
                  rotation={[0, rotationY, 0]}
                  fontSize={textSize}
                  anchorX="center"
                  anchorY="middle"
                  color={isHovered ? "#ffff99" : "#ffffff"}
                  onPointerOver={() => {
                    setHoveredIndex(i);
                    setIsPaused(true);
                  }}
                  onPointerOut={() => {
                    setHoveredIndex(null);
                    setIsPaused(false);
                  }}
                >
                  {line}
                </Text>
              </Float>
            );
          })}
        </group>
      </group>
    )
  );
}
