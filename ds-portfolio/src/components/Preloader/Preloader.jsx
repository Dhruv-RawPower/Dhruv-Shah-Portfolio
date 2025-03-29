// Preloader.jsx
import { useMemo ,useEffect } from "react";
import usePreloadedModels from "../../customHooks/usePreloadedModels.jsx";
import usePreloadedTerrainTextures from "../../customHooks/usePreloadedTerrainTextures.jsx";
import usePreloadedTextures from "../../customHooks/usePreloadedPlanetTextures.jsx";
import usePreloadedFonts from "../../customHooks/usePreloadedFonts.jsx";

const Preloader = ({ setAssets }) => {
  const textures = usePreloadedTextures();
  const terrainTextures = usePreloadedTerrainTextures();
  const { saintModel, lowPolyTree } = usePreloadedModels();
  const elderGodsBB = usePreloadedFonts().elderGodsBB;

  useEffect(() => {
    // ✅ Only set assets after loading
    if (textures && terrainTextures && saintModel && lowPolyTree && elderGodsBB) {
      setAssets({
        textures,
        terrainTextures,
        saintModel,
        lowPolyTree,
        elderGodsBB
      });
    }
  }, [textures, terrainTextures, saintModel, lowPolyTree, elderGodsBB, setAssets]);

  return null; // No visible content needed
};

export default Preloader;
