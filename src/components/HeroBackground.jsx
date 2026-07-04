import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const WireframeKnot = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[10, 3, 200, 32]} />
        <meshBasicMaterial 
          color="#b449f6" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </mesh>
    </Float>
  );
};

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-dark-bg z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-dark-bg to-dark-bg opacity-70 z-10 pointer-events-none" />
      
      <div className="absolute inset-0 z-20 opacity-60 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
          <fog attach="fog" args={['#0a0a0a', 20, 60]} />
          <ambientLight intensity={0.5} />
          <WireframeKnot />
        </Canvas>
      </div>
      
      {/* Fallback subtle gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg z-30 pointer-events-none" />
    </div>
  );
}
