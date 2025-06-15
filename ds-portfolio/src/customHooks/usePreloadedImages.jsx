// ✅ hooks/usePreloadedTextures.js
import { useTexture } from "@react-three/drei";

useTexture.preload(`${import.meta.env.BASE_URL}/images/dhruvPixarStyle.png`);

const usePreloadedImages = () => {
  // ✅ Load and return textures
  return {
    devImage: useTexture(`${import.meta.env.BASE_URL}/images/dhruvPixarStyle.png`),
  };
};

export default usePreloadedImages;