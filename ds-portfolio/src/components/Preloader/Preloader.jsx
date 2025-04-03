// Preloader.jsx
import { useMemo ,useEffect } from "react";
import usePreloadedModels from "../../customHooks/usePreloadedModels.jsx";
import usePreloadedTerrainTextures from "../../customHooks/usePreloadedTerrainTextures.jsx";
import usePreloadedTextures from "../../customHooks/usePreloadedPlanetTextures.jsx";
import usePreloadedFonts from "../../customHooks/usePreloadedFonts.jsx";
import usePreloadedImages from "../../customHooks/usePreloadedImages.jsx";

const Preloader = ({ setAssets }) => {
  const textures = usePreloadedTextures();
  const terrainTextures = usePreloadedTerrainTextures();
  const { saintModel, lowPolyTree } = usePreloadedModels();
  const elderGodsBB = usePreloadedFonts().elderGodsBB;
  const devImage = usePreloadedImages().devImage;

  useEffect(() => {
    // ✅ Only set assets after loading
    if (textures && terrainTextures && saintModel && lowPolyTree && elderGodsBB && devImage) {
      setAssets({
        textures,
        terrainTextures,
        saintModel,
        lowPolyTree,
        elderGodsBB,
        devImage,
      });
    }
  }, [textures, terrainTextures, saintModel, lowPolyTree, elderGodsBB, setAssets, devImage]);

  return null; // No visible content needed
};

export default Preloader;
