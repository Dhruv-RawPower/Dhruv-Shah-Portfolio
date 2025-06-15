import {  useGLTF } from "@react-three/drei";

useGLTF.preload(`${import.meta.env.BASE_URL}models/lowPolyTree.gltf`);
useGLTF.preload(`${import.meta.env.BASE_URL}/saintAnimated.gltf`);

const usePreloadedModels = () => {
  // ✅ Load and return textures
  return {
    saintModel : useGLTF(`${import.meta.env.BASE_URL}/saintAnimated.gltf`),
    lowPolyTree : useGLTF(`${import.meta.env.BASE_URL}models/lowPolyTree.gltf`),
  };
};

export default usePreloadedModels;

