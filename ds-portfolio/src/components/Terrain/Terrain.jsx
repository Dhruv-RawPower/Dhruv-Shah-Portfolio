import React, { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import Tree from "../Tree/Tree";

// 🌄 Optimized Terrain with Pre-Cloned Trees
const Terrain = ({ terrainTextures, lowPolyTree }) => {
  const {
    terrainHeightMap: heightMap,
    terrainColor: terrainTexture,
    terrainNormal: normalMap,
    terrainRough: roughnessMap,
    terrainAmbientOcclusion: aoMap,
  } = terrainTextures;

  // 🌳 Predefined tree positions (Memoized)
  const treePositions = useMemo(
    () => [
      [5, 0, -5],
      [-8, 0, -8],
      [18, 0, -13],
      [10, 0, -1],
      [-10, 0, -3],
    ],
    []
  );

  // 📏 Adjust terrain resolution based on screen size
  const terrainRes = useMemo(() => {
    return window.innerWidth > 1200 ? 512 : 256;
  }, []);

  return (
    <>
      {/* 🌄 Optimized Terrain Mesh */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.1, 0]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[100, 50, terrainRes, terrainRes]} />
          <meshStandardMaterial
            map={terrainTexture}
            displacementMap={heightMap}
            displacementScale={2}
            displacementBias={-0.5}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>
      </RigidBody>

      {/* 🌳 Render Optimized Trees */}
      {treePositions.map((pos, index) => (
        <Tree
          key={index}
          position={pos}
          scale={[0.5, 0.5, 0.5]}
          lowPolyTree={lowPolyTree}
        />
      ))}
    </>
  );
};

export default Terrain;
