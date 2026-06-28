import { useMemo } from 'react';
import * as THREE from 'three';

export default function CampusGround() {
  const pathMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d1d5db', roughness: 0.9, metalness: 0 }),
    []
  );
  const grassMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#4ade80', roughness: 1, metalness: 0 }),
    []
  );
  const darkGrassMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 1, metalness: 0 }),
    []
  );

  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#3d7c47" roughness={1} />
      </mesh>

      {/* Campus paths - horizontal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 1]} receiveShadow>
        <planeGeometry args={[18, 1.2]} />
        <primitive object={pathMaterial} />
      </mesh>

      {/* Campus paths - vertical */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[1.2, 18]} />
        <primitive object={pathMaterial} />
      </mesh>

      {/* Diagonal path 1 */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[-2, 0.005, -0.5]} receiveShadow>
        <planeGeometry args={[8, 0.9]} />
        <primitive object={pathMaterial} />
      </mesh>

      {/* Grass patches */}
      {[
        [-4.5, 4.5],
        [4.5, 4.5],
        [-4.5, -4.5],
        [4.5, -4.5],
        [7, 0],
        [-7, 0],
      ].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.002, z]} receiveShadow>
          <circleGeometry args={[1.8, 16]} />
          <primitive object={i % 2 === 0 ? grassMaterial : darkGrassMaterial} />
        </mesh>
      ))}

      {/* Trees (simple cylinders + spheres) */}
      {[
        [-5.5, 4.8, 0.6],
        [5.5, 4.2, 0.5],
        [-5, -5, 0.7],
        [5.2, -4.8, 0.55],
        [7.5, 1, 0.5],
        [-7.5, -1, 0.6],
        [1.5, 4.5, 0.5],
        [-1.5, -5, 0.6],
      ].map(([x, z, s], i) => (
        <group key={`tree-${i}`} position={[x, 0, z]}>
          {/* Trunk */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
            <meshStandardMaterial color="#92400e" roughness={1} />
          </mesh>
          {/* Canopy */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <sphereGeometry args={[s, 10, 10]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#15803d' : i % 3 === 1 ? '#16a34a' : '#4ade80'} roughness={1} />
          </mesh>
        </group>
      ))}

      {/* Lamp posts */}
      {[
        [-1.5, 1.5],
        [1.5, 1.5],
        [-1.5, -1.5],
        [1.5, -1.5],
      ].map(([x, z], i) => (
        <group key={`lamp-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 2, 6]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[x, 2.1, z]} intensity={0.4} distance={4} color="#fef9c3" />
        </group>
      ))}

      {/* Campus sign */}
      <group position={[0, 0, 6]}>
        <mesh position={[-0.5, 0.6, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0.5, 0.6, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[2.2, 0.5, 0.1]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      </group>

      {/* Fountain at center */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.16, 20]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.4, 10]} />
          <meshStandardMaterial color="#6b7280" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 0.08, 20]} />
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.7} roughness={0} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
