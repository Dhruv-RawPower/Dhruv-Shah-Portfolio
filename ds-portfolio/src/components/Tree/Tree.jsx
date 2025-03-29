import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

  const Tree = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0],lowPolyTree }) => {
  // 🌳 Load the tree model
  const { scene } = lowPolyTree;//useGLTF(`${import.meta.env.BASE_URL}/models/lowPolyTree.gltf`);

  // 🚀 Clone the model to prevent conflicts
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // 📦 Optimize the tree for better performance
  useMemo(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
};

export default Tree;
