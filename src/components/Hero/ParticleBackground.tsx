'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  reducedMotion: boolean;
}

function ParticleSystem({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const particleCount = 200; // Reduced from potential higher counts

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      colors[i * 3] = 0.4 + Math.random() * 0.4;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
    }

    return { positions, colors };
  }, [particleCount]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positionArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground({ reducedMotion }: ParticleBackgroundProps) {
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-accent-blue/10" />
    );
  }

  return (
    <div className="absolute inset-0" style={{ willChange: 'transform' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <ParticleSystem reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
