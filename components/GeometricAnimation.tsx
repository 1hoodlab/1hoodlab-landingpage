"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"

function StarField() {
  const ref = useRef()

  const positions = new Float32Array(
    Array.from({ length: 8 }, () => {
      return [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 0]
    }).flat(),
  )

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.001
    }
  })

  return (
    <group ref={ref}>
      <Points positions={positions}>
        <PointMaterial transparent color="#fff" size={6} sizeAttenuation={false} depthWrite={false} />
      </Points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#fff" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

export default function GeometricAnimation() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <StarField />
      </Canvas>
    </div>
  )
}

