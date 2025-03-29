import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function Arcane({ navButton, textures }) {
  // 🌌 Refs for spheres
  const mercuryRef = useRef();
  const venusRef = useRef();
  const earthRef = useRef();
  const marsRef = useRef();

  // 🛰️ Animation Progress Ref
  const progressRef = useRef(0);
  const planetStartPositionRef = new THREE.Vector3(0, 60.6, -200);
  const endPositionMercuryRef = new THREE.Vector3(-1.2, 1, 2);
  const endPositionVenusRef = new THREE.Vector3(1, 1, 2);

  // 📚 Text content for spheres
  const textLinesSphere1 = ["SAAS Platform", "using Next JS", "for Modern Apps"];
  const textLinesSphere2 = ["Chat Application", "using Angular", "and Stomp JS"];

  // 🎥 Rotate and animate spheres
  useFrame((state, delta) => {
    const rotateSpeed = 0.5 * delta;

    // ✅ Rotate spheres
    [mercuryRef, venusRef, earthRef, marsRef].forEach((ref) => {
      if (ref.current) ref.current.rotation.y += rotateSpeed;
    });

    // ✅ Move spheres towards target
    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta * 0.9, 1);
      mercuryRef.current?.position.lerpVectors(
        planetStartPositionRef,
        endPositionMercuryRef,
        progressRef.current
      );
      venusRef.current?.position.lerpVectors(
        planetStartPositionRef,
        endPositionVenusRef,
        progressRef.current
      );
      earthRef.current?.position.lerpVectors(
        planetStartPositionRef,
        endPositionMercuryRef,
        progressRef.current
      );
      marsRef.current?.position.lerpVectors(
        planetStartPositionRef,
        endPositionVenusRef,
        progressRef.current
      );
    }
  });

  // 🔗 Click event handler for navigation
  const handleClick = (ref) => {
    if (ref === mercuryRef) window.open("https://www.youtube.com/", "_blank");
    else if (ref === venusRef)
      window.open("https://www.linkedin.com/in/dhruvshah09/", "_blank");
  };

  // 📚 Render Text as Flat 2D (OUTSIDE the sphere)
  const renderTextLines = (lines, position) => (
    <group position={position}>
      {lines.map((line, index) => (
        <Text
          key={index}
          fontSize={0.08}
          position={[0, -index * 0.12, 0]}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}
    </group>
  );

  // 🌐 Render spheres (Text is placed separately)
  const renderSphere = (ref, texture, textLines, position) => (
    <>
      {/* Sphere Mesh */}
      <mesh
        ref={ref}
        position={position}
        onClick={() => handleClick(ref)}
        onPointerOver={() => ref.current.scale.set(0.95, 0.95, 0.95)}
        onPointerOut={() => ref.current.scale.set(1, 1, 1)}
      >
        <sphereGeometry args={[0.6, 16, 16]} /> {/* Reduced segment count */}
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Static Text Above Sphere */}
      {renderTextLines(textLines, [position[0], position[1] + 0.9, position[2]])}
    </>
  );

  return (
    <>
      {/* 🔥 Projects Group */}
      <group visible={navButton === "Projects"}>
        {renderSphere(mercuryRef, textures.mercury, textLinesSphere1, [-1, 1, 2])}
        {renderSphere(venusRef, textures.venus, textLinesSphere2, [1, 1, 2])}
      </group>

      {/* 🌍 About Group */}
      <group visible={navButton === "About"}>
        {renderSphere(earthRef, textures.earth, textLinesSphere1, [-1, 1, 2])}
        {renderSphere(marsRef, textures.mars, textLinesSphere2, [1, 1, 2])}
      </group>
    </>
  );
}
