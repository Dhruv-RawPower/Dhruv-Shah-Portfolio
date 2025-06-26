import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function Arcane({ navButton, textures }) {
  // 🔗 References for spheres
  const sphereRefs = {
    mercury: useRef(),
    venus: useRef(),
    earth: useRef(),
    mars: useRef(),
  };

  // 🎥 Animation Progress Ref
  const progressRef = useRef(0);
  const [spheresRendered, setSpheresRendered] = useState(false);

  // 🪐 Initial & Final Positions
  const startPos = new THREE.Vector3(0, 60.6, -200);
  const endPositions = {
    mercury: new THREE.Vector3(-1.2, 1, 2),
    venus: new THREE.Vector3(1, 1, 2),
    earth: new THREE.Vector3(-1, 1, 2),
    mars: new THREE.Vector3(1, 1, 2),
  };

  // 🌌 Animate spheres smoothly
  useFrame((_, delta) => {
    const rotateSpeed = 0.5 * delta;
    Object.values(sphereRefs).forEach((ref) => {
      if (ref.current) ref.current.rotation.y += rotateSpeed;
    });

    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta * 0.9, 1);
      Object.entries(sphereRefs).forEach(([key, ref]) => {
        if (ref.current) {
          ref.current.position.lerpVectors(startPos, endPositions[key], progressRef.current);
        }
      });

      if (progressRef.current >= 1 && !spheresRendered) {
        setSpheresRendered(true);
      }
    }
  });

  // ✨ Memoized Sphere Rendering (with hover cursor)
  const renderSphere = useMemo(
    () => (name, texture, onClick) => (
      <mesh
        ref={sphereRefs[name]}
        position={endPositions[name]}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    ),
    [textures]
  );

  // 📌 Memoized HTML Info Box
  const renderHtmlBox = useMemo(
    () => (position, title, line1, line2) =>
      spheresRendered && (
        <Html position={position} transform>
          <div className="info-box">
            <span className="title">{title}</span>
            <span className="desc">{line1}</span>
            <span className="desc">{line2}</span>
          </div>
        </Html>
      ),
    [spheresRendered]
  );

  return (
    <>
      {/* 🚀 Projects Group */}
      {navButton === "Projects" && (
        <group>
          {renderSphere("venus", textures.venus, () => window.open("https://e-commerce-store-with-3-d-product-preview-2.vercel.app/", "_blank"))}
          {renderSphere("earth", textures.earth, () => window.open("https://github.com/Dhruv-RawPower/AI-Powered-Blog-Website", "_blank"))}
          {renderHtmlBox([-4.2, -2.4, -5], "🚀 3D E-Commerce Store", "⚡ using Next JS, React Three Fiber,", "Prisma and Paypal.")}
          {renderHtmlBox([3.5, -2.4, -5], "🚀 AI Powered web", "⚡ blog website", "💡 and Stomp JS")}
        </group>
      )}
    </>
  );
}
