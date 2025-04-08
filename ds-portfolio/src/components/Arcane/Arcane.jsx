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

  // ✨ Memoized Sphere Rendering (Prevents Re-renders)
  const renderSphere = useMemo(
    () => (name, texture, onClick) => (
      <mesh ref={sphereRefs[name]} position={endPositions[name]} onClick={onClick}>
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
          {renderSphere("mercury", textures.mercury, () => window.open("https://www.youtube.com/", "_blank"))}
          {renderSphere("venus", textures.venus, () => window.open("https://www.linkedin.com/in/dhruvshah09/", "_blank"))}
          {renderHtmlBox([-4.2, -2.4, -5], "🚀 SAAS Platform", "⚡ using Next JS", "💡 for Modern Apps")}
          {renderHtmlBox([3.5, -2.4, -5], "🚀 Chat Application", "⚡ using Angular", "💡 and Stomp JS")}
        </group>
      )}

      {/* 🌍 About Group 
      {navButton === "About" && (
        <group>
          {renderSphere("earth", textures.earth)}
          {renderSphere("mars", textures.mars)}
          {renderHtmlBox([-4.2, -2.4, -5], "Work", "⚡ using Next JS", "💡 for Modern Apps")}
          {renderHtmlBox([3.5, -2.4, -5], "GG", "⚡ using Angular", "💡 and Stomp JS")}
        </group>
      )}*/}

      {/* 🌍 Contact Group 
      {navButton === "Contact" && (
        <group>
          {renderSphere("earth", textures.earth)}
          {renderSphere("mars", textures.mars)}
          {renderHtmlBox([-4.2, -2.4, -5], "Contact", "⚡ using Next JS", "💡 for Modern Apps")}
          {renderHtmlBox([3.5, -2.4, -5], "Linkedin", "⚡ using Angular", "💡 and Stomp JS")}
        </group>
      )}*/}
    </>
  );
}
