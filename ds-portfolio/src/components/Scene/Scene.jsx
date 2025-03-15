import SaintAnimationModel from "../SaintAnimationModel/SaintAnimationModel.jsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <SaintAnimationModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}