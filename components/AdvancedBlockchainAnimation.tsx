"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

// Shader for the connections
const vertexShader = `
  varying vec2 vUv;
  uniform float time;
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;
  
  void main() {
    vec2 uv = vUv;
    float alpha = sin(uv.x * 20.0 - time * 2.0) * 0.5 + 0.5;
    gl_FragColor = vec4(0.0, 1.0, 0.8, alpha * 0.3);
  }
`

function Node({ position }) {
  return (
    <Sphere position={position} args={[0.1, 32, 32]}>
      <MeshDistortMaterial color="#00ffd5" speed={2} distort={0.3} radius={1} />
    </Sphere>
  )
}

function Connection({ start, end }) {
  const ref = useRef()
  const [startV, endV] = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end])

  useFrame(({ clock }) => {
    ref.current.uniforms.time.value = clock.getElapsedTime()
  })

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function BlockchainNetwork() {
  const groupRef = useRef()
  const nodes = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 4 - 2
      const y = Math.random() * 4 - 2
      const z = Math.random() * 4 - 2
      temp.push([x, y, z])
    }
    return temp
  }, [])

  const connections = useMemo(() => {
    const temp = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.75) temp.push([i, j])
      }
    }
    return temp
  }, [nodes])

  useFrame(({ clock, mouse }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    groupRef.current.rotation.x = mouse.y * 0.2
    groupRef.current.rotation.z = -mouse.x * 0.2
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Node key={i} position={node} />
      ))}
      {connections.map(([start, end], i) => (
        <Connection key={i} start={nodes[start]} end={nodes[end]} />
      ))}
    </group>
  )
}

export default function AdvancedBlockchainAnimation() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <BlockchainNetwork />
      <OrbitControls enableZoom={false} enablePan={false} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  )
}

