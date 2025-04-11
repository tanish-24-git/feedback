"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center, OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

interface TextProps {
  text: string
  color?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  fontSize?: number
}

function AnimatedText({
  text,
  color = "#0FFF50",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  fontSize = 1,
}: TextProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={fontSize}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {text}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </Text3D>
    </mesh>
  )
}

export default function ThreeDText({ text, color }: { text: string; color?: string }) {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Center>
          <AnimatedText text={text} color={color} />
        </Center>
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
