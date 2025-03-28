import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useState, useRef, useEffect, useCallback, useMemo, Suspense  } from "react";
import SaintAnimationModel from "../SaintAnimationModel/SaintAnimationModel.jsx";
import Chains from "../Chains/Chains.jsx";
import Arcane from "../Arcane/Arcane.jsx";
import "./Navbar.css";

const Navbar = () => {
  const [disableButton, setDisableButton] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [numLinksAnimation, setNumLinksAnimation] = useState(10);
  const [navbarPosition, setNavbarPosition] = useState([-5.5, 0.5, 0]);
  const [showMeteorite, setShowMeteorite] = useState(false);

  // Refs to avoid unnecessary re-renders
  const targetNumLinks = useRef(10);
  const targetNavbarPosition = useRef([-5.5, 0.5, 0]);
  const lerpSpeed = 0.06;

  // Memoized viewport check to avoid recalculating
  const { viewport } = useThree();
  const isMobile = useMemo(() => viewport.width < 8, [viewport.width]);

  // Optimized useFrame to avoid frequent state updates
  useFrame(() => {
    const deltaLinks = targetNumLinks.current - numLinksAnimation;
    if (Math.abs(deltaLinks) > 0.1) {
      setNumLinksAnimation(
        (prev) => prev + deltaLinks * lerpSpeed
      );
    }

    const newPosition = [
      navbarPosition[0] +
        (targetNavbarPosition.current[0] - navbarPosition[0]) * lerpSpeed,
      navbarPosition[1] +
        (targetNavbarPosition.current[1] - navbarPosition[1]) * lerpSpeed,
      navbarPosition[2] +
        (targetNavbarPosition.current[2] - navbarPosition[2]) * lerpSpeed,
    ];

    if (
      Math.abs(newPosition[0] - navbarPosition[0]) > 0.001 ||
      Math.abs(newPosition[1] - navbarPosition[1]) > 0.001 ||
      Math.abs(newPosition[2] - navbarPosition[2]) > 0.001
    ) {
      setNavbarPosition(newPosition);
    }
  });

  // Optimize Animation and Position Update
  useEffect(() => {
    targetNumLinks.current = playAnimation && !animationCompleted ? 5 : 10;
    targetNavbarPosition.current = playAnimation && !animationCompleted
      ? [-5.5, 2.0, 0]
      : [-5.5, 0.5, 0];
  }, [playAnimation, animationCompleted]);

  // Memoized handler to prevent re-renders
  const handleAnimationComplete = useCallback(() => {
    console.log("Animation has completed. Updating Navbar...");
    setDisableButton(false);
    setPlayAnimation(false);
    setAnimationCompleted(true);
  }, []);

  const handleShowMeteorite = useCallback(() => {
    setDisableButton(true);
    setPlayAnimation((prev) => !prev);
    setAnimationCompleted(false);
    setShowMeteorite((prev) => !prev);
    setTimeout(() => {
      setShowMeteorite(true);
      setDisableButton(false);
    }
    , 100);
  }, [playAnimation]);

  return (
    <>
      {/* Memoized Chains to Avoid Re-renders */}
      {useMemo(
        () => (
          <>
            <Chains
              position={[-6.2, 4.5, 0]}
              snakeAmplitude={-0.02}
              snakeSpeed={3.0}
              snakeFrequency={0.2}
              numLinks={Math.round(numLinksAnimation)}
            />
            <Chains
              position={[-4.9, 4.5, 0]}
              snakeAmplitude={0.02}
              snakeSpeed={3.0}
              snakeFrequency={0.2}
              numLinks={Math.round(numLinksAnimation)}
            />
          </>
        ),
        [numLinksAnimation]
      )}

      <Html
        position={isMobile ? [0, 2, 0] : navbarPosition}
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
            fontSize: "1vw",
            margin: "0 0 1vw 0",
            color: "#fff",
          }}
        >
          Dhruv Shah Portfolio
        </h2>
        <div className="navClass">
          <button onClick={handleShowMeteorite} className="dungeon-btn" disabled={disableButton}>
            Projects
          </button>
          <button onClick={handleShowMeteorite} className="dungeon-btn" disabled={disableButton}>
            About
          </button>
        </div>
      </Html>
      
      {/* Memoized Meteorite to Avoid Unnecessary Renders */}
      <Suspense fallback={null}>
        {useMemo(() => showMeteorite && <Arcane />, [showMeteorite])}
      </Suspense>
      
      <SaintAnimationModel
        playAnimation={playAnimation}
        onAnimationComplete={handleAnimationComplete}
      />
    </>
  );
};

export default Navbar;
