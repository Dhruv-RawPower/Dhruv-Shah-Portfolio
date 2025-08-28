import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SaintAnimationModel({
  playAnimation,
  onAnimationComplete,
  saintModel,
}) {
  const { scene, animations } = saintModel;
  const [spotLightPower, setSpotLightPower] = useState(10);
  const lightRef = useRef();
  const modelRef = useRef();
  const mixerRef = useRef(null);
  const actionRef = useRef(null);

  // 🎥 Memoize animations setup
  const { mixer, action, waitAction } = useMemo(() => {
    if (!animations?.length) return {};
    
    const mixer = new THREE.AnimationMixer(scene);
    const action = mixer.clipAction(animations[0]);
    const waitAction = mixer.clipAction(animations[2]);

    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopOnce, 1);

    return { mixer, action, waitAction };
  }, [animations, scene]);

  // 🧠 Initialize animations
  useEffect(() => {
    if (!mixer || !action) return;

    mixerRef.current = mixer;
    actionRef.current = action;

    const handleFinish = () => {
      console.log("Animation Completed!");
      onAnimationComplete?.();
      setSpotLightPower(100);
    };

    mixer.addEventListener("finished", handleFinish);
    return () => mixer.removeEventListener("finished", handleFinish);
  }, [mixer, action, onAnimationComplete]);

  // 🎮 Control animation playback
  useEffect(() => {
    if (!mixer || !action) return;

    if (playAnimation) {
      console.log("Playing Animation...");
      waitAction?.stop();
      action.reset().play();
      setSpotLightPower(1000);
    } else {
      console.log("Stopping Animation...");
      action.stop();
      waitAction?.reset().play();
      setSpotLightPower(100);
    }
  }, [playAnimation, mixer, action, waitAction]);

  // 🕹️ Frame update
  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
    if (lightRef.current && modelRef.current) {
      lightRef.current.target.position.copy(modelRef.current.position);
      lightRef.current.target.updateMatrixWorld();
    }
  }, -1); // Lower priority for useFrame

  // 🌟 Configure shadows once
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      <primitive
        ref={modelRef}
        object={scene}
        scale={1}
        rotation={[0, -0.5, 0]}
        position={[4, -0.5, 0.5]}
      />
      <spotLight
        ref={lightRef}
        position={[2, 3, 3]}
        angle={0.3}
        penumbra={1}
        intensity={spotLightPower / 10}
        castShadow
        color="#ff5555"
        shadow-mapSize={[512, 512]} // Array instead of separate props
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-bias={-0.0005}
      />
    </>
  );
}