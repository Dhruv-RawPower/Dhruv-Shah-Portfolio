import { useGLTF } from "@react-three/drei";

export default function SaintAnimationModel() {
  const { scene } = useGLTF("/saintAnimated.gltf"); // Replace with your GLTF model path
  return <primitive object={scene} scale={1} />;
}