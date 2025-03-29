// ✅ hooks/usePreloadedTextures.js
import { useTexture } from "@react-three/drei";


useTexture.preload(`${import.meta.env.BASE_URL}/textures/mercury/mercuryColor.jpg`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/venus/venusColor.jpg`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/earth/earth.jpg`);
useTexture.preload(`${import.meta.env.BASE_URL}/textures/mars/marsColor.jpg`);

const usePreloadedTextures = () => {
  // ✅ Load and return textures
  return {
    mercury: useTexture(`${import.meta.env.BASE_URL}/textures/mercury/mercuryColor.jpg`),
    venus: useTexture(`${import.meta.env.BASE_URL}/textures/venus/venusColor.jpg`),
    earth: useTexture(`${import.meta.env.BASE_URL}/textures/earth/earth.jpg`),
    mars: useTexture(`${import.meta.env.BASE_URL}/textures/mars/marsColor.jpg`),
  };
};

export default usePreloadedTextures;
