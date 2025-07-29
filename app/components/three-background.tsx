"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import type * as THREE from "three"

// Minimalistic floating elements for better performance and aesthetics
function MinimalisticElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Simple geometric shapes with subtle animations */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, 1, -2]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, -1, -3]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#8b5cf6" transparent opacity={0.5} />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[0, 2, -4]}>
          <torusGeometry args={[0.2, 0.05]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Environment preset="dawn" />
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#3b82f6" />

        <MinimalisticElements />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
