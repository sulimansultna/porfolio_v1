"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

interface FloatingCubeProps {
  position: [number, number, number]
}

export default function FloatingCube({ position }: FloatingCubeProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.8} roughness={0.1} metalness={0.8} />
    </mesh>
  )
}
