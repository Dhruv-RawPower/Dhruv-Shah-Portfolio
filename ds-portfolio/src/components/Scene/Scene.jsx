import { EffectComposer, Bloom  } from "@react-three/postprocessing";
import Terrain from "../Terrain/Terrain";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";


const Scene = () => {    
  return (
    <>
      {/* Sky and Terrain */}
      <Terrain />
      

      {/* Post-processing Effects */}
      <EffectComposer enableNormalPass>
      

      {/* ✨ Bloom for soft highlights */}
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.03}
        intensity={0.5}
      />


      {/* 🎯 Use UnrealBloomPass properly */}
      <primitive
        object={new UnrealBloomPass(undefined, 0.5, 0.4, 0.85)}
        attachArray="passes"
      />
    </EffectComposer>



    </>
  );
};

export default Scene;
