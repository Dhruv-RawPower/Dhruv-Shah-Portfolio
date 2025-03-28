import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Navbar from "./components/Navbar/Navbar.jsx"
import Scene from "./components/Scene/Scene.jsx";
import Starfield from "./components/Starfield/Starfield.jsx"; 
import { useTexture, useFont } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import { Physics } from "@react-three/rapier";
import { Perf } from 'r3f-perf'


useTexture.preload("/textures/mercury/mercuryColor.jpg");
useTexture.preload("/textures/venus/venusColor.jpg");
useTexture.preload("/textures/earth/earth.jpg");
useTexture.preload("/textures/mars/marsColor.jpg")
useFont.preload("/fonts/ElderGods BB.json");

// Extend THREE.AxesHelper for JSX usage
extend({ AxesHelper: THREE.AxesHelper });

export default function App() {
  return (
      <Canvas 
              dpr={[1, 1.5]} // Limit pixel ratio
              style={{ width: "100vw", height: "100vh" }}
              gl={{ powerPreference: "high-performance", antialias: true }}
              shadows
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              camera={{ position: [0, 1, 5], rotation: [0, 0, 0] }}
             // onCreated={({ scene }) => {
             //   scene.fog = new THREE.FogExp2("#5f5f5f", 0.07); // Smokey Gray Fog
             // }}              
              >
           {/*    <fog attach="fog" color="hotpink" near={1} far={10} />*/}
              <fogExp2 attach="fog" color="#DFE9F3" density={0.005} />


        <Perf position="top-left" />
              <ambientLight color={"#D6DCE3"} intensity={0.4} />
              
            {/*<OrbitControls />*/} 

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
