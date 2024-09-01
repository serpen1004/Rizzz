import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Donut({ position, rotation, scale }) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.3
  })

  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.4, 16, 100), [])
  const material = useMemo(() => new THREE.MeshNormalMaterial(), [])

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry} material={material} />
  )
}

function Donuts({ count = 50 }) {
  const donuts = useMemo(() => {
    return new Array(count).fill().map((_, i) => ({
      position: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 15],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.5 + 0.5
    }))
  }, [count])

  return donuts.map((props, i) => <Donut key={i} {...props} />)
}

function Scene() {
  const sceneRef = useRef()

  useFrame(({ mouse }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = mouse.x * 0.1
      sceneRef.current.rotation.x = mouse.y * 0.1
    }
  })

  return (
    <group ref={sceneRef}>
      <Donuts />
      <Text
        position={[0, 0, 0]}
        fontSize={2}
        color="white"
      >
        Welcome!
      </Text>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
      <Scene />
    </Canvas>
  )
}

export default App