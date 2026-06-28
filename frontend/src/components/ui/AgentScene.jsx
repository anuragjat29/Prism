import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

export default function AgentScene({ status }) {
  const centralRef = useRef();
  const satellitesRef = useRef([]);

  const isProcessing = status === 'Processing';
  const speed = isProcessing ? 4.5 : 1.2;
  const color = isProcessing ? '#EDEFF0' : '#7B8285';

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (centralRef.current) {
      centralRef.current.rotation.y = time * 0.2;
      centralRef.current.rotation.x = time * 0.1;
    }
    satellitesRef.current.forEach((satellite, index) => {
      if (satellite) {
        const orbitSpeed = (index + 1) * 0.8;
        const radius = 1.6 + index * 0.4;
        const angle = time * orbitSpeed + (index * Math.PI) / 2;
        satellite.position.x = Math.cos(angle) * radius;
        satellite.position.z = Math.sin(angle) * radius;
        satellite.position.y = Math.sin(time + index) * 0.4;
        satellite.rotation.y = time * 2;
      }
    });
  });

  return (
    <group>
      <mesh ref={centralRef} scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={isProcessing ? 0.6 : 0.2}
          speed={speed}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} ref={(el) => (satellitesRef.current[i] = el)} scale={0.15 - i * 0.01}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={isProcessing ? 1.2 : 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
