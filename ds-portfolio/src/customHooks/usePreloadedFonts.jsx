import {  useFont } from "@react-three/drei";

useFont.preload(`${import.meta.env.BASE_URL}/fonts/ElderGods BB.json`);

const usePreloadedFonts = () => {
  // ✅ Load and return textures
  return {
    elderGodsBB : useFont(`${import.meta.env.BASE_URL}/fonts/ElderGods BB.json`),
  };
};

export default usePreloadedFonts;

