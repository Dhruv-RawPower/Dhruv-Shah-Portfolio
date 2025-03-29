import React, { useMemo } from "react";
import * as THREE from "three";

// 🌳 Optimized Tree with Single Clone for Trunk & Leaves
const Tree = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], lowPolyTree }) => {
  // ✅ Clone tree once and reuse
  const clonedTree = useMemo(() => {
    if (!lowPolyTree || !lowPolyTree.scene) {
      console.warn("⚠️ No valid tree model found!");
      return null;
    }

    // 🎯 Clone entire tree hierarchy
    const clone = lowPolyTree.scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clone;
  }, [lowPolyTree]);

  if (!clonedTree) return null;

  return (
    <primitive
      object={clonedTree}
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
};

export default Tree;
