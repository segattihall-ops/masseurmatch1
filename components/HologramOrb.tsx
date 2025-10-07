import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function HologramOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} />
        <Sphere args={[1.5, 100, 200]} scale={1.2}>
          <MeshDistortMaterial
            color="#b393d3"
            attach="material"
            distort={0.5}
            speed={2.5}
            roughness={0.2}
            metalness={1}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
