import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Preload } from "@react-three/drei";
import Navbar from "./components/Navbar/Navbar.jsx";
import Scene from "./components/Scene/Scene.jsx";
import Starfield from "./components/Starfield/Starfield.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import * as THREE from "three";
import "./App.css";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useState, useEffect } from "react";
import ErrorBoundary from "./components/Error Boundary/ErrorBoundary.jsx"


extend({ AxesHelper: THREE.AxesHelper });

export default function App() {
  const [assets, setAssets] = useState({
    textures: null,
    terrainTextures: null,
    saintModel: null,
    lowPolyTree: null,
    elderGodsBB: null,
    devImage: null,
  });

  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  // Detect screen rotation and update state
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    }, [camera, size]);
    return null;
  }

  return (
    <>
      {/* Show Overlay if Device is in Portrait Mode */}
      {isPortrait && (
        <div className="rotate-warning">
          <p>🔄 Please rotate your device to landscape mode.</p>
        </div>
      )}

      <Canvas
        dpr={[1, 1.5]}
        style={{ width: "100vw", height: "100vh", display: isPortrait ? "none" : "block" }}
        gl={{ powerPreference: "high-performance", antialias: true }}
        onCreated={({ gl }) => {
          gl.debug.checkShaderErrors = true;
        }}
        shadows
        camera={{ position: [0, 1, 5], rotation: [0, 0, 0] }}
      >
        {/* <OrbitControls /> */}
        <ResponsiveCamera />
        {/* 🌌 Preload assets and pass data */}
        <ErrorBoundary name="Preloader">
          <Preloader setAssets={setAssets} />
        </ErrorBoundary>

        {/* Fog for environment */}
        <fogExp2 attach="fog" color="#DFE9F3" density={0.005} />
        {/* <Perf position="top-left" /> */}

        {!assets.textures || !assets.terrainTextures || !assets.lowPolyTree || !assets.saintModel || !assets.elderGodsBB || !assets.devImage ? (
          <Html>
            <div style={{ color: "white", fontSize: "24px" }}>Loading assets...</div>
          </Html>
        ) : (
          <>
            <ambientLight color={"#D6DCE3"} intensity={0.4} />
            {/* Night Sky Starfield */}
            <ErrorBoundary name="Starfield">
              <Starfield count={10000} />
            </ErrorBoundary>
            <Physics>
              {/* Pass loaded assets to components */}
              <ErrorBoundary name="Scene">
                <Scene
                  terrainTextures={assets.terrainTextures}
                  lowPolyTree={assets.lowPolyTree}
                />
              </ErrorBoundary>
              <ErrorBoundary name="Navbar">
                <Navbar textures={assets.textures} saintModel={assets.saintModel} elderGodsBB={assets.elderGodsBB}/>
              </ErrorBoundary>
            </Physics>
          </>
        )}
      <Preload all />  
      </Canvas>
    </>
  );
}
