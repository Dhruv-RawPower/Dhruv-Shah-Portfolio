import { useState, useEffect } from "react";
import "./Home.css";
import { Html } from "@react-three/drei";

const Home = ( {visible} ) => {
  if (!visible) return null; // 🔥 Hides Home if not selected

  const [typedText, setTypedText] = useState("");
  const fullText = "Software Developer | 3D Enthusiast | Innovator";
  const typingSpeed = 120; // Typing speed in ms

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <Html position={[0, 1, 0]} center>
    <div className="home-container">
      <div className="profile-img"></div> 
      <h1 className="home-title">{typedText}</h1>
      <p className="home-tagline">Building immersive web experiences</p>
    </div>
    </Html>
  );
};

export default Home;
