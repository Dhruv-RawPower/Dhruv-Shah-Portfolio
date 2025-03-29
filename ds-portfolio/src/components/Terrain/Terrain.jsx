import * as THREE from "three";
import  { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import Tree from "../Tree/Tree";

const Terrain = ({terrainTextures , lowPolyTree}) => {
  // 🗻 Load height map and texture assets
  const heightMap = terrainTextures.terrainHeightMap;
  const terrainTexture = terrainTextures.terrainColor;
  const normalMap =terrainTextures.terrainNormal;
  const roughnessMap = terrainTextures.terrainRough;
  const aoMap = terrainTextures.terrainAmbientOcclusion;

  // 🌳 Define tree positions and scales
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

  return (
    <>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.1, 0]}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[100, 50, 512, 512]} />
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
     
      {/* 🌳 Render Trees */}
      {treePositions.map((pos, index) => (
        <Tree key={index} position={pos} scale={[0.5, 0.5, 0.5]} lowPolyTree = {lowPolyTree} />
      ))}
    </>
  );
};

export default Terrain;
