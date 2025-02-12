"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function Cube({ position, size, color }) {
  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2
    mesh.current.rotation.y += delta * 0.2
  })
  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function CubeCluster() {
  const group = useRef()
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
  })
  return (
    <group ref={group}>
      <Cube position={[0, 0, 0]} size={[0.5, 0.5, 0.5]} color="#00ffd5" />
      <Cube position={[1, 1, 1]} size={[0.3, 0.3, 0.3]} color="#00d4b4" />
      <Cube position={[-1, -1, -1]} size={[0.2, 0.2, 0.2]} color="#00a88f" />
      <Cube position={[-1, 1, -0.5]} size={[0.4, 0.4, 0.4]} color="#00ffd5" />
      <Cube position={[1, -1, 0.5]} size={[0.3, 0.3, 0.3]} color="#00d4b4" />
    </group>
  )
}

export default function BlockchainAnimation() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CubeCluster />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

