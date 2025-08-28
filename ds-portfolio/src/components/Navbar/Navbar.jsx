import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useState, useRef, useEffect, Suspense, useMemo } from "react";
import SaintAnimationModel from "../SaintAnimationModel/SaintAnimationModel.jsx";
import Arcane from "../Arcane/Arcane.jsx";
import "./Navbar.css";
import ErrorBoundary from "../Error Boundary/ErrorBoundary.jsx";
import Home from "../Home/Home.jsx";
import About from "../About/About.jsx";
import ContactRunes from "../Contact/Contact.jsx";

const Navbar = ({ textures, saintModel, elderGodsBB }) => {
  const { camera, viewport } = useThree();
  const [disableButton, setDisableButton] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showMeteorite, setShowMeteorite] = useState(false);
  const [navButton, setNavButton] = useState("Home");
  const [isPulled, setIsPulled] = useState(false);
  const navbarPositionRef = useRef(new THREE.Vector3());

  // 📏 Calculate navbar position once per viewport change
  useFrame(() => {
    const fovScale = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const aspectRatio = viewport.width / viewport.height;
    navbarPositionRef.current.set(
      -fovScale * aspectRatio * 0.7,
      fovScale * 0.4,
      0
    );
  }, [camera.fov, camera.position.z, viewport.width, viewport.height]);

  const handleShowMeteorite = (navButtonName) => {
    if (disableButton) return;

    setDisableButton(true);
    setPlayAnimation(true);
    setShowMeteorite(false);
    setNavButton(navButtonName);

    setTimeout(() => {
      setShowMeteorite(true);
      setDisableButton(false);
    }, 100);
  };

  // Memoize button array to prevent re-renders
  const navButtons = useMemo(() => 
    ["Home", "Projects", "About", "Contact"].map((btnName) => (
      <button
        key={btnName}
        onClick={() => {
          handleShowMeteorite(btnName);
          setIsPulled((prev) => !prev);
        }}
        className="dungeon-btn"
        disabled={disableButton}
      >
        {btnName}
      </button>
    )),
    [disableButton]
  );

  return (
    <>
      <Html
        position={navbarPositionRef.current.toArray()}
        transform
        distanceFactor={Math.min(Math.max(camera.position.z / 3, 4.5), 7)}
        style={{
          width: `clamp(180px, ${viewport.width * 0.15}px, 280px)`,
          textAlign: "center",
          padding: "1.2rem",
          backgroundColor: "rgba(15, 15, 16, 0.85)",
          border: "solid 1px rgba(165, 159, 141, 0.7)",
          borderRadius: "12px",
          zIndex: 20,
        }}
      >
        <h2 style={{ fontSize: "2vw", color: "greenyellow", textTransform: "uppercase" }}>
          Dhruv Shah
        </h2>
        <div className="navClass">{navButtons}</div>
      </Html>

      <ErrorBoundary name="Arcane">
        <Suspense fallback={null}>
          {showMeteorite && (
            <Arcane navButton={navButton} textures={textures} elderGodsBB={elderGodsBB} />
          )}
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary name="Home">
        <Suspense fallback={null}>
          <Home visible={navButton === "Home"} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary name="About">
        <Suspense fallback={null}>
          <About visible={navButton === "About"} />
        </Suspense>
      </ErrorBoundary>  

      <ErrorBoundary name="Contact Runes">
        <Suspense fallback={null}>
          <ContactRunes visible={navButton === "Contact"} />
        </Suspense>
      </ErrorBoundary>    

      <ErrorBoundary name="Saint animation">
        <SaintAnimationModel
          playAnimation={playAnimation}
          onAnimationComplete={() => {
            setDisableButton(false);
            setPlayAnimation(false);
          }}
          saintModel={saintModel}
        />
      </ErrorBoundary>
    </>
  );
};

export default Navbar;