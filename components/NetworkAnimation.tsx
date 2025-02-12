"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function Lines({ count = 100, separation = 1.5 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((_, i) => {
      const x = separation * (i - count / 2)
      return new THREE.Vector3(x, 0, 0)
    })
    return p
  }, [count, separation])

  const lineRef = useRef()

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    points.forEach((point, i) => {
      const y = Math.sin(time * 0.5 + i * 0.1) * 0.5
      point.y = y
    })
    if (lineRef.current) {
      lineRef.current.geometry.setFromPoints(points)
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.05} />
    </line>
  )
}

function Stars({ count = 1000 }) {
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      p[i * 3] = x
      p[i * 3 + 1] = y
      p[i * 3 + 2] = z
    }
    return p
  }, [count])

  return (
    <Points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.02} sizeAttenuation transparent color="#ffffff" opacity={0.3} fog={false} />
    </Points>
  )
}

export default function NetworkAnimation() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
      <fog attach="fog" args={["#000", 20, 40]} />
      <ambientLight intensity={0.5} />
      <Stars />
      <group>
        {Array.from({ length: 30 }, (_, i) => (
          <Lines key={i} count={50} separation={1} />
        ))}
      </group>
    </Canvas>
  )
}

