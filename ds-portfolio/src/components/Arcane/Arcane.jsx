import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text3D } from "@react-three/drei";

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
  const textLinesSphere2 = ["Chat Application", "using Angular", "and Stomp JS"];

  // 📡 State to track sphere rendering
  const [spheresRendered, setSpheresRendered] = useState(false);

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

      // ✅ Set flag after spheres finish animation
      if (progressRef.current >= 1 && !spheresRendered) {
        setSpheresRendered(true);
      }
    }
  });

  // 🌐 Render spheres (Text is placed separately after)
  const renderSphere = (ref, texture, position) => (
    <mesh
      ref={ref}
      position={position}
      onClick={() => handleClick(ref)}
      onPointerOver={() => ref.current.scale.set(0.95, 0.95, 0.95)}
      onPointerOut={() => ref.current.scale.set(1, 1, 1)}
    >
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );

  // 🔗 Click event handler for navigation
  const handleClick = (ref) => {
    if (ref === mercuryRef) window.open("https://www.youtube.com/", "_blank");
    else if (ref === venusRef)
      window.open("https://www.linkedin.com/in/dhruvshah09/", "_blank");
  };

  return (
    <>
      {/* 🔥 Projects Group */}
      <group visible={navButton === "Projects"}>
        {renderSphere(mercuryRef, textures.mercury, [-1, 1, 2])}
        {renderSphere(venusRef, textures.venus, [1, 1, 2])}

        {spheresRendered && (
          <Html position={[-4.2, -2.4, -5]} rotation={[0, 0, 0]} transform>
            <div
              style={{
                width: "10vw",
                maxWidth: "200px",
                textAlign: "center",
                padding: "1vw",
                backgroundColor: "rgba(15, 15, 16, 0.6)",
                border: "solid",
                borderRadius: "10px",
                borderColor: "rgba(165, 159, 141, 0.6)"
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9vw", // Responsive font size
                  //lineHeight: "1.5",
                }}
              >
                🚀 SAAS Platform
              </span>
              <span
                style={{
                  fontSize: "0.9vw", // Changed 28px to 0.9vw
                 // lineHeight: "1.5",
                }}
              >
                ⚡ using Next JS
              </span>
              <span
                style={{
                  fontSize: "0.9vw", // Changed 28px to 0.9vw
                 // lineHeight: "1.5",
                }}
              >
                💡 for Modern Apps
              </span>
            </div>
          </Html>
        )}
      </group>

      {/* 🌍 About Group */}
      <group visible={navButton === "About"}>
        {renderSphere(earthRef, textures.earth, [-1, 1, 2])}
        {renderSphere(marsRef, textures.mars, [1, 1, 2])}

        {/* 🎉 Render Text AFTER Spheres are Loaded */}
        {spheresRendered && (
          <>
            <Html position={[3.5, -2.4, -5]} rotation={[0, 0, 0]} transform > 
            <div
              style={{
                width: "10vw",
                maxWidth: "200px",
                textAlign: "center",
                padding: "1vw",
                backgroundColor: "rgba(15, 15, 16, 0.6)",
                border: "solid",
                borderRadius: "10px",
                borderColor: "rgba(165, 159, 141, 0.6)"
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9vw", // Responsive font size
                  //lineHeight: "1.5",
                }}
              >
                🚀 Chat Application
              </span>
              <span
                style={{
                  fontSize: "0.9vw", // Changed 28px to 0.9vw
                 // lineHeight: "1.5",
                }}
              >
                ⚡ using Angular
              </span>
              <span
                style={{
                  fontSize: "0.9vw", // Changed 28px to 0.9vw
                 // lineHeight: "1.5",
                }}
              >
                💡 and Stomp JS
              </span>
            </div>
          </Html>
          </>
        )}
      </group>
    </>
  );
}
