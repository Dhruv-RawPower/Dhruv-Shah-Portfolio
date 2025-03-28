import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Navbar from "./components/Navbar/Navbar.jsx"
import Scene from "./components/Scene/Scene.jsx";
import Starfield from "./components/Starfield/Starfield.jsx"; 
import Arcane from "./components/Arcane/Arcane.jsx";

import * as THREE from "three";
import "./App.css";
import { Physics } from "@react-three/rapier";

// Extend THREE.AxesHelper for JSX usage
extend({ AxesHelper: THREE.AxesHelper });

export default function App() {
  return (
      <Canvas 
              dpr={[1, 1.5]} // Limit pixel ratio
              style={{ width: "100vw", height: "100vh" }}
              shadows
              camera={{ position: [0, 1, 5], rotation: [0, 0, 0] 
                
              }}              
              >
              <ambientLight color={"#D6DCE3"} intensity={0.8} />
              
             {/* <OrbitControls /> */}

        {/* Night Sky Starfield */}
        <Starfield count={10000} /> {/* Increase or decrease stars */}    
        <Physics>
          <Scene />
          <Navbar />
        </Physics>
        
        {/* Add AxesHelper with length 5 
        <axesHelper args={[5]} />*/}
      </Canvas>
  );
}
