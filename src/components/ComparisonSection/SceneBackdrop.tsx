'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneBackdropProps {
  activeChip: string | null;
  reducedMotion: boolean;
}

interface ParticleSystemProps {
  side: 'take2' | 'apps';
  activeChip: string | null;
  reducedMotion: boolean;
}

const chipColors = {
  all: '#6EE7B7', // accent-green
  time: '#3B82F6', // accent-blue
  clarity: '#8B5CF6', // purple
  safety: '#F59E0B', // amber
  vibe: '#EF4444' // red
};

function ParticleSystem({ side, activeChip, reducedMotion }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const particleCount = side === 'take2' ? 150 : 100;
  
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      if (side === 'take2') {
        // Take2 side - particles start from left, flow toward right
        positions[i * 3] = -8 + Math.random() * 6; // x: left side
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y: spread
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // z: depth
        
        // Cohesive flow toward Take2
        velocities[i * 3] = 0.005 + Math.random() * 0.01; // rightward
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002; // slight y movement
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002; // slight z movement
        
        // Brighter, more cohesive colors
        colors[i * 3] = 0.4 + Math.random() * 0.6; // r
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // g
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4; // b
      } else {
        // Apps side - more scattered, chaotic
        positions[i * 3] = 2 + Math.random() * 6; // x: right side
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y: spread
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // z: depth
        
        // Diffuse, random movement
        velocities[i * 3] = (Math.random() - 0.5) * 0.008; // random x
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008; // random y
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008; // random z
        
        // Muted, scattered colors
        colors[i * 3] = 0.3 + Math.random() * 0.3; // r
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // g
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.3; // b
      }
    }
    
    return { positions, colors, velocities };
  }, [particleCount, side]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const colorArray = meshRef.current.geometry.attributes.color.array as Float32Array;
    
    // Get active chip color
    const chipColor = activeChip ? chipColors[activeChip as keyof typeof chipColors] : '#6EE7B7';
    const targetColor = new THREE.Color(chipColor);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update positions with velocities
      positionArray[i3] += velocities[i3];
      positionArray[i3 + 1] += velocities[i3 + 1] + Math.sin(time + i * 0.1) * 0.001;
      positionArray[i3 + 2] += velocities[i3 + 2];
      
      // Reset particles that go out of bounds
      if (side === 'take2') {
        if (positionArray[i3] > 8) {
          positionArray[i3] = -8;
          positionArray[i3 + 1] = (Math.random() - 0.5) * 8;
        }
      } else {
        if (Math.abs(positionArray[i3]) > 8 || Math.abs(positionArray[i3 + 1]) > 6) {
          positionArray[i3] = 2 + Math.random() * 6;
          positionArray[i3 + 1] = (Math.random() - 0.5) * 8;
        }
      }
      
      // Tint particles based on active chip
      if (activeChip) {
        const mixFactor = 0.02;
        colorArray[i3] += (targetColor.r - colorArray[i3]) * mixFactor;
        colorArray[i3 + 1] += (targetColor.g - colorArray[i3 + 1]) * mixFactor;
        colorArray[i3 + 2] += (targetColor.b - colorArray[i3 + 2]) * mixFactor;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
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
        size={side === 'take2' ? 0.03 : 0.02}
        vertexColors
        transparent
        opacity={side === 'take2' ? 0.8 : 0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function SceneBackdrop({ activeChip, reducedMotion }: SceneBackdropProps) {
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-50 to-accent-green/10 transition-colors duration-500" />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <ParticleSystem side="take2" activeChip={activeChip} reducedMotion={reducedMotion} />
        <ParticleSystem side="apps" activeChip={activeChip} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
