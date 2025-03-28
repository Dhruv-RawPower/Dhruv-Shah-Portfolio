import * as THREE from "three";
import { Suspense, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text3D, useTexture } from "@react-three/drei";

export default function Arcane({ navButton }) {
  // 🌌 Refs for spheres
  const mercuryRef = useRef();
  const venusRef = useRef();
  const earthRef = useRef();
  const marsRef = useRef();

  const mercurySphereRef = useRef();
  const venusSphereRef = useRef();
  const earthSphereRef = useRef();
  const marsSphereRef = useRef();

  // 🛰️ Ref for animation progress
  const progressRef = useRef(0);
  const planetStartPositionRef = new THREE.Vector3(0, 60.6, -200); // Starting position
  const endPositionMercuryRef = new THREE.Vector3(-1.2, 1, 2);
  const endPositionVenusRef = new THREE.Vector3(1, 1, 2);

  // ✅ Load textures correctly
  const mercury = useTexture("/textures/mercury/mercuryColor.jpg");
  const venus = useTexture("/textures/venus/venusColor.jpg");
  const earth = useTexture("/textures/earth/earth.jpg");
  const mars = useTexture("/textures/mars/marsColor.jpg");

  // 📚 Text content for spheres
  const textLinesSphere1 = ["SAAS Platform", "using Next JS", "for Modern Apps"];
  const textLinesSphere2 = ["Chat Application", "using Angular", "and Stomp JS"];

  // 🎥 Rotate spheres and move them towards target
  useFrame((state, delta) => {
    [mercurySphereRef, venusSphereRef, earthSphereRef, marsSphereRef].forEach(
      (ref) => {
        if (ref.current) ref.current.rotateY(0.5 * delta);
      }
    );

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

  // 📚 Helper to render multiline text
  const renderTextLines = (lines, position) => (
    <group position={position}>
      {lines.map((line, index) => (
        <Suspense fallback={null} key={index}>
          <Text3D
            font={"/fonts/ElderGods BB.json"}
            size={0.08}
            height={0.02}
            position={[-0.3, -index * 0.15, 0.2]}
          >
            {line}
            <meshStandardMaterial
              color="white"
              emissive="white"
              emissiveIntensity={0.5}
            />
          </Text3D>
        </Suspense>
      ))}
    </group>
  );

  // 🌐 Render single sphere with optimized props
  const renderSphere = (ref, sphereRef, texture, textLines, handleClick) => (
    <mesh
      ref={ref}
      onClick={() => handleClick(ref)}
      onPointerOver={() => ref.current.scale.set(0.95, 0.95, 0.95)}
      onPointerOut={() => ref.current.scale.set(1, 1, 1)}
    >
      <sphereGeometry ref={sphereRef} args={[0.8, 16, 16]} />
      <meshStandardMaterial map={texture} />
      {renderTextLines(textLines, [0.268, 0.05, 0.9])}
    </mesh>
  );

  return (
    <>
      {/* 🔥 Projects Group */}
      <group visible={navButton === "Projects"}>
        {renderSphere(mercuryRef, mercurySphereRef, mercury, textLinesSphere1, handleClick)}
        {renderSphere(venusRef, venusSphereRef, venus, textLinesSphere2, handleClick)}
      </group>

      {/* 🌍 About Group */}
      <group visible={navButton === "About"}>
        {renderSphere(earthRef, earthSphereRef, earth, textLinesSphere1, handleClick)}
        {renderSphere(marsRef, marsSphereRef, mars, textLinesSphere2, handleClick)}
      </group>
    </>
  );
}
