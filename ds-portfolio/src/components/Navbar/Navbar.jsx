import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from "react";
import SaintAnimationModel from "../SaintAnimationModel/SaintAnimationModel.jsx";
import Chains from "../Chains/Chains.jsx";
import Arcane from "../Arcane/Arcane.jsx";
import "./Navbar.css";
import ErrorBoundary from "../Error Boundary/ErrorBoundary.jsx";

const Navbar = ({ textures, saintModel, elderGodsBB }) => {
  const [disableButton, setDisableButton] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [showMeteorite, setShowMeteorite] = useState(false);
  const [navButton, setNavButton] = useState("Home");

  // 🎯 References for Animation & Position
  const numLinksAnimationRef = useRef(10);
  const targetNumLinks = useRef(10);

  const targetNavbarPosition = useRef(new THREE.Vector3(-5.5, 0.5, 0));
  const navbarPositionRef = useRef(new THREE.Vector3(-5.5, 0.5, 0));

  // 🚀 Lerp Speed for Smooth Transitions
  const lerpSpeed = 0.08;

  // ✅ Viewport Check for Mobile Layouts
  const { viewport } = useThree();
  const isMobile = useMemo(() => viewport.width < 8, [viewport.width]);

  // 🎥 Smooth Frame Update to Avoid Re-renders
  useFrame(() => {
    // Smoothly update chain links animation
    if (Math.abs(targetNumLinks.current - numLinksAnimationRef.current) > 0.1) {
      numLinksAnimationRef.current +=
        (targetNumLinks.current - numLinksAnimationRef.current) * lerpSpeed;
    }

    // Smoothly interpolate Navbar position
    navbarPositionRef.current.lerpVectors(
      navbarPositionRef.current,
      targetNavbarPosition.current,
      lerpSpeed
    );
  });

  // 📚 Update Targets on Animation Change
  useEffect(() => {
    targetNumLinks.current = playAnimation && !animationCompleted ? 5 : 10;
    targetNavbarPosition.current.set(
      playAnimation && !animationCompleted ? -5.5 : -5.5,
      playAnimation && !animationCompleted ? 2.0 : 0.5,
      0
    );
  }, [playAnimation, animationCompleted]);

  // 🎥 Handle Animation Completion
  const handleAnimationComplete = useCallback(() => {
    setDisableButton(false);
    setPlayAnimation(false);
    setAnimationCompleted(true);
  }, []);

  // 🛑 Prevent Rapid Button Clicks
  const handleShowMeteorite = useCallback(
    (navButtonName) => {
      if (disableButton) return;

      setDisableButton(true);
      setPlayAnimation((prev) => !prev);
      setAnimationCompleted(false);
      setShowMeteorite((prev) => !prev);
      setNavButton(navButtonName);

      setTimeout(() => {
        setShowMeteorite(true);
        setDisableButton(false);
      }, 100);
    },
    [playAnimation]
  );

  // ⛓️ Memoized Chain Rendering
  const memoizedChains = useMemo(
    () => (
      <>
        <Chains
          position={[-6.2, 4.5, 0]}
          snakeAmplitude={-0.02}
          snakeSpeed={3.0}
          snakeFrequency={0.2}
          numLinks={Math.round(numLinksAnimationRef.current)}
        />
        <Chains
          position={[-4.9, 4.5, 0]}
          snakeAmplitude={0.02}
          snakeSpeed={3.0}
          snakeFrequency={0.2}
          numLinks={Math.round(numLinksAnimationRef.current)}
        />
      </>
    ),
    []
  );

  // 📚 Memoized Navbar Buttons
  const memoizedNavbarButtons = useMemo(
    () => (
      <div className="navClass">
        {["Home", "Projects", "About", "Contact"].map((btnName) => (
          <button
            key={btnName}
            onClick={() => handleShowMeteorite(btnName)}
            className="dungeon-btn"
            disabled={disableButton}
          >
            {btnName}
          </button>
        ))}
      </div>
    ),
    [disableButton, handleShowMeteorite]
  );

  return (
    <>
      {/* ⛓️ Render Optimized Chains */}
      {memoizedChains}

      {/* 🛸 Render Navbar (Optimized with useRef) */}
      <Html
        position={navbarPositionRef.current.toArray()} // ✅ Use Ref for Position
        rotation={[0, 0, 0]}
        transform
        distanceFactor={isMobile ? 3 : 4.5}
        style={{
          width: "10vw",
          maxWidth: "200px",
          textAlign: "center",
          padding: "1vw",
          backgroundColor: "rgba(15, 15, 16, 0.6)",
          border: "solid",
          borderRadius: "10px",
          borderColor: "rgba(165, 159, 141, 0.6)",
        }}
      >
        <h2
          style={{
            fontSize: "1.5vw",
            margin: "0 0 1vw 0",
            color: "greenyellow",
          }}
        >
          Dhruv Shah
        </h2>
        {memoizedNavbarButtons}
      </Html>

      {/* 🌠 Render Meteorite */}
      <ErrorBoundary name="Arcane">
        <Suspense fallback={null}>
          {showMeteorite && (
            <Arcane
              navButton={navButton}
              textures={textures}
              elderGodsBB={elderGodsBB}
            />
          )}
        </Suspense>
      </ErrorBoundary>

      {/* ✨ Render Saint Animation */}
      <ErrorBoundary name="Saint animation">
        <SaintAnimationModel
          playAnimation={playAnimation}
          onAnimationComplete={handleAnimationComplete}
          saintModel={saintModel}
        />
      </ErrorBoundary>
    </>
  );
};

export default Navbar;
