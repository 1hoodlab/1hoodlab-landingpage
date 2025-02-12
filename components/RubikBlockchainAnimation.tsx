"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

const colors = ["#00ffd5", "#00d4b4", "#00a88f"]

const Cube = React.memo(({ position, spread }) => {
  const meshRef = useRef()
  const [x, y, z] = position
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
      meshRef.current.position.x = x * (spread ? 2 : 1)
      meshRef.current.position.y = y * (spread ? 2 : 1)
      meshRef.current.position.z = z * (spread ? 2 : 1)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
})

const Connection = React.memo(({ start, end, spread }) => {
  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      const [x1, y1, z1] = start
      const [x2, y2, z2] = end
      const spreadFactor = spread ? 2 : 1

      ref.current.geometry.setFromPoints([
        new THREE.Vector3(x1 * spreadFactor, y1 * spreadFactor, z1 * spreadFactor),
        new THREE.Vector3(x2 * spreadFactor, y2 * spreadFactor, z2 * spreadFactor),
      ])
    }
  })

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#00ffd5" transparent opacity={0.2} />
    </line>
  )
})

const BlockchainNetwork = React.memo(({ spread }) => {
  const groupRef = useRef()

  const [nodes, connections] = useMemo(() => {
    const tempNodes = []
    const tempConnections = []

    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 3
      const y = (Math.random() - 0.5) * 3
      const z = (Math.random() - 0.5) * 3
      tempNodes.push([x, y, z])
    }

    for (let i = 0; i < tempNodes.length; i++) {
      for (let j = i + 1; j < tempNodes.length; j++) {
        if (Math.random() > 0.75) tempConnections.push([i, j])
      }
    }

    return [tempNodes, tempConnections]
  }, [])

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
      groupRef.current.rotation.x = mouse.y * 0.2
      groupRef.current.rotation.z = -mouse.x * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Cube key={i} position={node} spread={spread} />
      ))}
      {connections.map(([start, end], i) => (
        <Connection key={i} start={nodes[start]} end={nodes[end]} spread={spread} />
      ))}
    </group>
  )
})

const RubikBlockchainAnimation = ({ scrollY }) => {
  const spread = scrollY > 100 // Spread out cubes when scrolled down 100px

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <BlockchainNetwork spread={spread} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  )
}

export default RubikBlockchainAnimation

