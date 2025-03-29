import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLightHelper } from "three";
import * as THREE from "three";

export default function SaintAnimationModel({
  playAnimation,
  onAnimationComplete,
  saintModel,
}) {
  const { scene, animations } = saintModel;
  const [spotLightPower, setSpotLightPower] = useState(10);
  const lightRef = useRef(); // Light ref
  const modelRef = useRef(); // Model ref
  const mixerRef = useRef(null);
  const actionRef = useRef(null);

  // 🎥 Memoize animations and setup once
  const setupAnimations = useMemo(() => {
    if (animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      const action = mixer.clipAction(animations[0]);
      const waitAction = mixer.clipAction(animations[2]);

      // Configure action to play once and stop
      action.clampWhenFinished = true;
      action.setLoop(THREE.LoopOnce, 1);

      return { mixer, action, waitAction };
    }
    return {};
  }, [animations, scene]);

  // 🧠 Attach animations once after load
  useEffect(() => {
    if (setupAnimations.mixer && setupAnimations.action) {
      mixerRef.current = setupAnimations.mixer;
      actionRef.current = setupAnimations.action;

      // Detect when animation finishes
      mixerRef.current.addEventListener("finished", () => {
        console.log("Animation Completed!");
        if (onAnimationComplete) {
          onAnimationComplete();
          setSpotLightPower(100);
        }
      });
    }
  }, [setupAnimations, onAnimationComplete]);

  // 🎮 Play/Stop animation based on `playAnimation`
  useEffect(() => {
    if (mixerRef.current && actionRef.current) {
      if (playAnimation) {
        console.log("Playing Animation...");
        setupAnimations.waitAction?.stop(); // Stop waiting action
        actionRef.current.reset().play(); // Play the animation
        setSpotLightPower(1000);
      } else {
        console.log("Stopping Animation...");
        actionRef.current.stop();
        setupAnimations.waitAction?.reset().play(); // Play waiting animation
        setSpotLightPower(100);
      }
    }
  }, [playAnimation, setupAnimations]);

  // 🕹️ Update animation on each frame
  useFrame((_, delta) => {
    mixerRef.current?.update(delta);

    // Optimize target update only when model exists
    if (lightRef.current && modelRef.current) {
      lightRef.current.target.position.copy(modelRef.current.position);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  // 🌟 Enable shadows for meshes only once after model loads
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      {/* 🧩 GLTF Model */}
      <primitive
        ref={modelRef}
        object={scene}
        scale={1}
        rotation={[0, -0.5, 0]}
        position={[4, -0.5, 0.5]}
        
      />

      {/* 🔥 Optimized SpotLight */}
      <spotLight
        ref={lightRef}
        position={[2, 3, 3]}
        angle={0.3}
        penumbra={1.0}
        intensity={9.5}
        castShadow
        color={"#ff5555"}
        power={spotLightPower}
        shadow-mapSize-width={512} // Reduce shadow map size
        shadow-mapSize-height={512} // Lowering resolution for optimization
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-bias={-0.0005} // Fine-tune shadow quality
      />
    </>
  );
}
