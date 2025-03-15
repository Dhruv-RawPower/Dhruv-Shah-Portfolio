import Navbar from "./components/Navbar/Navbar.jsx"
import Scene from "./components/Scene/Scene.jsx";


export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Scene />
    </div>
  );
}
