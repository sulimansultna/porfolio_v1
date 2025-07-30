"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type * as THREE from "three"

function FloatingDots() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* Minimalistic floating dots */}
      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
      </mesh>

      <mesh position={[2, -1, 0]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>

      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[0.04]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export default function MinimalisticDashboard3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <Environment preset="dawn" />
      <ambientLight intensity={0.1} />
      <FloatingDots />
    </Canvas>
  )
}
