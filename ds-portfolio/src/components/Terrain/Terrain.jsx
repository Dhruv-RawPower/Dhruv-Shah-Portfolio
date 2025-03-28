import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { useLoader, extend } from "@react-three/fiber";
import {  RigidBody } from "@react-three/rapier";

const Terrain = () => {
  // 🗻 Load height map and texture assets
  const heightMap = useLoader(THREE.TextureLoader, "/textures/terrainHeightMap.png");
  const terrainTexture = useLoader(THREE.TextureLoader, "/textures/terrainColor.jpg");
  const normalMap = useLoader(THREE.TextureLoader, "/textures/terrainNormal.jpg");
  const roughnessMap = useLoader(THREE.TextureLoader, "/textures/terrainRough.jpg");
  const aoMap = useLoader(THREE.TextureLoader, "/textures/terrainAmbientOcclusion.jpg");

  // 🎨 Create Terrain Material with fine-tuned attributes
  const terrainMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: terrainTexture,
        displacementMap: heightMap,
        displacementScale: 5,
        displacementBias: -0.5,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        aoMap: aoMap,
        roughness: 0.8,
        metalness: 0.0,
        aoMapIntensity: 0.9,
      }),
    [heightMap, terrainTexture, normalMap, roughnessMap, aoMap]
  );

  // 📈 Convert height map to height data for physics
  const heightFieldData = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = 256;
    const height = 256;
    canvas.width = width;
    canvas.height = height;

    context.drawImage(heightMap.image, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const { data } = imageData;

    const heights = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4; // RGBA values
        const heightValue = data[i] / 255; // Normalize between 0 and 1
        row.push(heightValue * 5); // Scale height
      }
      heights.push(row);
    }
    return heights;
  }, [heightMap]);

  // 🌌 Add fog for realistic atmospheric depth
  extend({ Fog: THREE.Fog });

  return (
    <>

        <RigidBody type="fixed" colliders="cuboid">
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.1, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[100, 100, 256, 256]} />
            <meshStandardMaterial
              map={terrainTexture}
              displacementMap={heightMap}
              displacementScale={2}
              displacementBias={-0.5}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              aoMap={aoMap}
              roughness={9}
              metalness={0.0}
              aoMapIntensity={0.9}
            />
          </mesh>
        </RigidBody>  
    </>
  );
};

export default Terrain;
