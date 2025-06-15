// ✅ hooks/usePreloadedTextures.js
import { useTexture } from "@react-three/drei";

useTexture.preload(`${import.meta.env.BASE_URL}/textures/terrainHeightMap.png`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/terrainColor.jpg`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/terrainNormal.jpg`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/terrainRough.jpg`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/terrainAmbientOcclusion.jpg`);

const usePreloadedTerrainTextures = () => {
  // ✅ Load and return textures
  return {
    terrainHeightMap: useTexture(`${import.meta.env.BASE_URL}/textures/terrainHeightMap.png`),
    terrainColor: useTexture(`${import.meta.env.BASE_URL}/textures/terrainColor.jpg`),
    terrainNormal: useTexture(`${import.meta.env.BASE_URL}/textures/terrainNormal.jpg`),
    terrainRough: useTexture(`${import.meta.env.BASE_URL}/textures/terrainRough.jpg`),
    terrainAmbientOcclusion: useTexture(`${import.meta.env.BASE_URL}/textures/terrainAmbientOcclusion.jpg`),
  };
};

export default usePreloadedTerrainTextures;