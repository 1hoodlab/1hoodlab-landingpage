"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Environment } from "@react-three/drei"
import * as THREE from "three"

function GeometricModel() {
  const meshRef = useRef()
  const geometryRef = useRef()

  const vertices = useMemo(() => {
    const verts = []
    const radius = 2
    const layers = 15
    const pointsPerLayer = 50

    for (let layer = 0; layer < layers; layer++) {
      const layerRadius = radius - layer * 0.15
      const heightOffset = layer * 0.2 - layers * 0.1
      const rotationOffset = (layer * Math.PI) / 6

      for (let i = 0; i < pointsPerLayer; i++) {
        const angle = (i / pointsPerLayer) * Math.PI * 2 + rotationOffset
        const x = Math.cos(angle) * layerRadius
        const y = heightOffset
        const z = Math.sin(angle) * layerRadius
        verts.push(new THREE.Vector3(x, y, z))
      }
    }
    return verts
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 2 + positions[i] * 0.5) * 0.002
      }
      geometryRef.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={meshRef}>
      <mesh>
        <tubeGeometry
          ref={geometryRef}
          args={[
            new THREE.CatmullRomCurve3(vertices),
            200, // tubular segments
            0.08, // radius
            12, // radial segments
            false,
          ]}
        />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
      {/* Add additional decorative elements */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>
    </group>
  )
}

export default function SpiralAnimation() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="studio" />
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <spotLight position={[-5, -5, -5]} angle={0.15} penumbra={1} intensity={0.5} castShadow />
      <GeometricModel />
    </Canvas>
  )
}

