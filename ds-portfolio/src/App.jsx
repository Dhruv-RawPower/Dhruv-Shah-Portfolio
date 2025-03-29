import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Navbar from "./components/Navbar/Navbar.jsx";
import Scene from "./components/Scene/Scene.jsx";
import Starfield from "./components/Starfield/Starfield.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import * as THREE from "three";
import "./App.css";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useState } from "react";
import ErrorBoundary from "./components/Error Boundary/ErrorBoundary.jsx"

extend({ AxesHelper: THREE.AxesHelper });

export default function App() {
  const [assets, setAssets] = useState({
    textures: null,
    terrainTextures: null,
    saintModel: null,
    lowPolyTree: null,
    elderGodsBB: null
  });

  return (
    <Canvas
      dpr={[1, 1.5]}
      style={{ width: "100vw", height: "100vh" }}
      gl={{ powerPreference: "high-performance", antialias: true }}
      onCreated={({ gl }) => {
        gl.debug.checkShaderErrors = true;
      }}
      shadows
      camera={{ position: [0, 1, 5], rotation: [0, 0, 0] }}
    >
      {/*<OrbitControls />*/}
      {/* 🌌 Preload assets and pass data */}
      <ErrorBoundary name="Preloader">
        <Preloader setAssets={setAssets} />
      </ErrorBoundary>
      {/* Fog for environment */}
      <fogExp2 attach="fog" color="#DFE9F3" density={0.005} />
      <Perf position="top-left" />

      {!assets.textures || !assets.terrainTextures || !assets.lowPolyTree || !assets.saintModel || !assets.elderGodsBB ? (
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
    </Canvas>

  );
}
