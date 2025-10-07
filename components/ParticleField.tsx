import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Particles() {
  const group = useRef<any>();
  const particles = Array.from({ length: 300 }, () => ({
    position: [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ] as [number, number, number],
    size: Math.random() * 0.03 + 0.005,
  }));

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.0005;
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#b393d3" : "#f5c16c"}
            emissive={i % 2 === 0 ? "#b393d3" : "#f5c16c"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0 opacity-20">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <Particles />
      </Canvas>
    </div>
  );
}
