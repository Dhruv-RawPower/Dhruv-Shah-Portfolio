import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useLoader  } from "@react-three/fiber";
import { Text3D, useTexture } from "@react-three/drei";
import ElderGodsBB from "/src/assets/fonts/ElderGods BB.json";

useTexture.preload("/textures/earth/earth.jpg");
useTexture.preload("/textures/mercury/mercuryColor.jpg");
useTexture.preload("/textures/venus/venusColor.jpg");

export default function Arcane() {
  const sphereRef1 = useRef();
  const sphereRef2 = useRef();
  const sphereRef3 = useRef();
  const geometryRef = useRef();
  const geometrySphere2 = useRef();
  
  const progressRef = useRef(0); // ✅ Use ref for progress
  const startPositionSphereRef1 = new THREE.Vector3(0, 60.6, -200); // Starting point
  const endPositionSphereRef1 = new THREE.Vector3(-1.2, 1, 2); // Target point
  const endPositionSphereRef2 = new THREE.Vector3(1, 1, 2); // Target point

  // 🔄 Rotate sphere on each frame
  useFrame((state, delta) => {
    if (geometryRef.current) {
      geometryRef.current.rotateY(0.5 * delta); // Y-axis rotation (adjust speed if needed)
      geometrySphere2.current.rotateY(0.5 * delta);
    }
  });

  // Load textures only once to optimize performance
  const mercury = useTexture("/textures/mercury/mercuryColor.jpg");
  const venus = useTexture("/textures/venus/venusColor.jpg")

  // ✅ Pass your multi-line text here
    const textLinesSphere1 = [
    "SAAS Platform",
    "using Next JS",
    "for Modern Apps",
    ];  

    const textLinesSphere2 = [
      "Chat Application",
      "using Angular",
      "and Stomp JS",
    ];

  // ✅ Move spheres towards target on every frame
  useFrame((state, delta) => {
    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta * 0.9, 1); // Control speed
      sphereRef1.current.position.lerpVectors(
        startPositionSphereRef1,
        endPositionSphereRef1,
        progressRef.current
      );
      sphereRef2.current.position.lerpVectors(
        startPositionSphereRef1,
        endPositionSphereRef2,
        progressRef.current
      );
    }
  });

  // ✅ Click event handler
  const handleClick = (ref) => {
    if(ref == sphereRef1)
    window.open("https://www.youtube.com/", "_blank");    
    else if(ref == sphereRef2)
    window.open("https://www.linkedin.com/in/dhruvshah09/", "_blank");        
  };

  return (
    <>
      {/* Sphere 1 */}
      <mesh 
        ref={sphereRef1}
        onClick={() => handleClick(sphereRef1)}
        onPointerOver={(e) => {
            sphereRef1.current.scale.multiplyScalar(0.95); // ✅ Scale down
          }}
          onPointerOut={(e) => {
            sphereRef1.current.scale.set(1, 1, 1); // Reset to original size
          }}
      >
        <sphereGeometry  ref={geometryRef} args={[0.8, 32, 32]} />
        <meshStandardMaterial
          map={mercury}
          //map={asteroidTexture}
          //aoMap={aoMap}
          //normalMap={normalMap}
          //roughnessMap={roughnessMap}
          roughness={0.4}
          metalness={0.3}
        />
        {/* ✅ Text3D added on Sphere 1 */}
        {/* ✅ Group for multiline text */}
      <group position={[0.268, 0.05,  0.9]}>
        {textLinesSphere1.map((line, index) => (
          <Text3D
            key={index}
            font={ElderGodsBB}
            size={0.08}
            height={0.02}
            position={[-0.3, -index * 0.15, 0.2]} // Auto space each line
          >
            {line}
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
          </Text3D>
        ))}
      </group>

      </mesh>

      {/* Sphere 2 ✅ Fixed onPointerOver */}
      <mesh
        ref={sphereRef2}
        position={[0, 1, -4]}
        onClick={() => handleClick(sphereRef2)}
        onPointerOver={(e) => {
          // Modify material properties on hover
          sphereRef2.current.scale.multiplyScalar(0.95); // ✅ Scale down
        }}
        onPointerOut={(e) => {
          // Reset properties when mouse leaves
          sphereRef2.current.scale.set(1, 1, 1); // Reset to original size
        }}
      >
        <sphereGeometry ref={geometrySphere2}  args={[0.8, 32, 32]} />
        <meshStandardMaterial
          map={venus}
        />
        {/* ✅ Group for multiline text */}
      <group position={[-0.19, 0.05, 0.9]}>
        {textLinesSphere2.map((line, index) => (
          <Text3D
            key={index}
            font={ElderGodsBB}
            size={0.08}
            height={0.02}
            position={[-0.5, -index * 0.15, 0.2]} // Auto space each line
          >
            {line}
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
          </Text3D>
        ))}
      </group>
      </mesh>
    </>
  );
}
