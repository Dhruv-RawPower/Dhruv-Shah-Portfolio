import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const contacts = [
  { name: "Email", icon: "📜", url: "mailto:dhruv10.shah@gmail.com" },
  { name: "GitHub", icon: "🛡️", url: "https://github.com/Dhruv-RawPower" },
  { name: "LinkedIn", icon: "🏰", url: "https://www.linkedin.com/in/dhruvshah09/" },
  { name: "YouTube", icon: "🔥", url: "https://www.youtube.com/@AdiShaktisRadiance" },
  { name: "Instagram", icon: "⚔️", url: "https://www.instagram.com/dhruvturner/#" },
];

export default function Contact({ visible }) {
  if (!visible) return null;

  const runeRefs = useRef([]);
  const { size: viewport } = useThree();

  const runeSize = Math.min(0.35, Math.max(0.2, viewport.width * 0.015));
  const labelSize = runeSize;

  useFrame(() => {
    runeRefs.current.forEach((ref, i) => {
      if (ref) {
        const offset = i * 0.5;
        ref.position.y = 0.2 + Math.sin(Date.now() * 0.002 + offset) * 0.05;
      }
    });
  });

  return (
    <group position={[0, 0.5, 0]}>
      {contacts.map((c, i) => {
        const x = -2 + i * 1.1;

        return (
          <group key={i}>
            {/* 🏷️ Label above rune */}
            <Text
              font={`${import.meta.env.BASE_URL}fonts/ElderGodsBB.ttf`}
              position={[x, 0.55, 0]}
              fontSize={labelSize}
              color="goldenrod"
              anchorX="center"
              anchorY="bottom"
            >
              {c.name}
            </Text>

            {/* 🧿 Rune icon */}
            <Text
              ref={(el) => (runeRefs.current[i] = el)}
              font={`${import.meta.env.BASE_URL}fonts/ElderGodsBB.ttf`}
              position={[x, 0.2, 0]}
              fontSize={runeSize}
              color="gold"
              anchorX="center"
              anchorY="middle"
              onClick={() => {
                window.open(c.url, "_blank");
              }}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
              }}
            >
              {c.icon}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
