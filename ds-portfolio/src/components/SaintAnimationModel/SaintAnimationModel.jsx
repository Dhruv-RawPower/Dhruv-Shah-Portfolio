import { useGLTF, useHelper } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { SpotLightHelper } from "three";
import * as THREE from "three";

export default function SaintAnimationModel({
  playAnimation,
  onAnimationComplete,
}) {
  const { scene, animations } = useGLTF("/saintAnimated.gltf"); // Load the model
  const [spotLightPower, setSpotLightPower] = useState(10);
  const lightRef = useRef(); // Ref for the light
  const modelRef = useRef(); // Ref for the model

  // Attach helper to the light
  //useHelper(lightRef, SpotLightHelper, "cyan");

  // Enable shadows for all child objects
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const mixerRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    if (animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene);

      // Get the first animation
      const action = mixerRef.current.clipAction(animations[0]);
      // Get the last animation
      const waitAction = mixerRef.current.clipAction(animations[2]);
      actionRef.current = action;

      // Play animation when playAnimation is true
      if (playAnimation) {
        console.log("Playing Animation...");
        waitAction.stop();
        action.reset().play();

        // Ensure it plays once and stops
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce, 1);
        setSpotLightPower(1000);
        // Detect when animation completes
        mixerRef.current.addEventListener("finished", () => {
          console.log("Animation Completed!");
          if (onAnimationComplete) {
            onAnimationComplete(); // Notify parent component (Navbar.jsx)
            setSpotLightPower(100);
          }
        });
      } else {
        action.stop();
        actionRef.current = waitAction;
        waitAction.play();
        waitAction.reset().play();
        console.log("Stopping Animation...");
        setSpotLightPower(100);
      }
    }
  }, [playAnimation, animations, scene, onAnimationComplete]);

  // Update animation on each frame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Update light target if model exists
    if (lightRef.current && modelRef.current) {
      lightRef.current.target.position.copy(
        modelRef.current.position
      ); // Point at model
      lightRef.current.target.updateMatrixWorld();
      console.log("in saint ",playAnimation);
      
    }
  });

  return (
    <>
      {/* GLTF Model with ref to make it target */}
      <primitive
        ref={modelRef}
        object={scene}
        scale={1}
        rotation={[0, -0.5, 0]}
        position={[4, -0.5, 0.5]}
      />

      {/* SpotLight with correct target */}
      <spotLight
        ref={lightRef}
        position={[2, 3, 3]} // Slightly above and to the side
        angle={0.3}
        penumbra={1.0}
        intensity={9.5}
        castShadow
        color={"#ff5555"}
        power={spotLightPower}
      />
    </>
  );
}
