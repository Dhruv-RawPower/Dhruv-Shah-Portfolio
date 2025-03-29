// components/ErrorBoundary.jsx
import { Html } from "@react-three/drei";
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("🛑 Error in component:", this.props.name, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html>
        <div style={{ color: "red" }}>
          ⚠️ Error in <strong>{this.props.name}</strong>
        </div>
        </Html>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
