import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Building } from '../store/campusStore';

interface BuildingMeshProps {
  building: Building;
  onClick: (building: Building) => void;
  isSelected: boolean;
  isAnySelected: boolean;
}

export default function BuildingMesh({ building, onClick, isSelected, isAnySelected }: BuildingMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [px, py, pz] = building.position;
  const [sx, sy, sz] = building.size;

  const mainColor = useMemo(() => new THREE.Color(building.color), [building.color]);
  const roofColor = useMemo(() => new THREE.Color(building.roofColor), [building.roofColor]);
  const emissiveColor = useMemo(() => new THREE.Color(hovered || isSelected ? building.color : '#000000'), [hovered, isSelected, building.color]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetY = hovered && !isAnySelected ? 0.3 : 0;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * Math.min(1, delta * 8);
    const targetScale = isSelected ? 1.08 : hovered && !isAnySelected ? 1.05 : 1;
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * Math.min(1, delta * 8);
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * Math.min(1, delta * 8);

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetEmissiveIntensity = isSelected ? 0.4 : hovered ? 0.25 : 0;
      mat.emissiveIntensity += (targetEmissiveIntensity - mat.emissiveIntensity) * Math.min(1, delta * 6);
    }
  });

  const opacity = isAnySelected && !isSelected ? 0.35 : 1;

  return (
    <group
      ref={groupRef}
      position={[px, py, pz]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(building);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!isAnySelected) {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Main building body */}
      <mesh ref={meshRef} position={[0, sy / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[sx, sy, sz]} />
        <meshStandardMaterial
          color={mainColor}
          emissive={emissiveColor}
          emissiveIntensity={0}
          transparent
          opacity={opacity}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, sy + 0.18, 0]} castShadow>
        <boxGeometry args={[sx + 0.1, 0.36, sz + 0.1]} />
        <meshStandardMaterial color={roofColor} transparent opacity={opacity} roughness={0.5} />
      </mesh>

      {/* Windows grid */}
      {[0.3, 0.7].map((rowFrac) =>
        [-0.28, 0, 0.28].map((colOffset, ci) => (
          <mesh key={`win-${rowFrac}-${ci}`} position={[colOffset * sx, rowFrac * sy + 0.05, sz / 2 + 0.01]}>
            <planeGeometry args={[sx * 0.18, sy * 0.14]} />
            <meshStandardMaterial
              color={hovered || isSelected ? '#fef9c3' : '#bfdbfe'}
              emissive={hovered || isSelected ? '#fef08a' : '#93c5fd'}
              emissiveIntensity={hovered || isSelected ? 0.8 : 0.2}
              transparent
              opacity={opacity * 0.9}
            />
          </mesh>
        ))
      )}

      {/* Entrance door */}
      <mesh position={[0, sy * 0.15, sz / 2 + 0.01]}>
        <planeGeometry args={[sx * 0.22, sy * 0.28]} />
        <meshStandardMaterial color="#78350f" transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Glow ring when selected */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(sx, sz) * 0.7, Math.max(sx, sz) * 0.85, 32]} />
          <meshBasicMaterial color={building.color} transparent opacity={0.5} />
        </mesh>
      )}

      {/* Hover tooltip */}
      {(hovered || isSelected) && !isAnySelected && (
        <Billboard position={[0, sy + 1.1, 0]}>
          <Text
            fontSize={0.28}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="#000000"
            font={undefined}
          >
            {building.emoji} {building.name}
          </Text>
          <Text
            fontSize={0.16}
            color="#fde68a"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.32, 0]}
            outlineWidth={0.03}
            outlineColor="#000000"
            font={undefined}
          >
            Click to explore
          </Text>
        </Billboard>
      )}

      {/* Always visible label (when no building selected) */}
      {!isAnySelected && !hovered && (
        <Billboard position={[0, sy + 0.7, 0]}>
          <Text
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.035}
            outlineColor="#1e1b4b"
            font={undefined}
          >
            {building.emoji}
          </Text>
        </Billboard>
      )}

      {/* Memory count badge */}
      {!isAnySelected && (
        <Billboard position={[sx / 2 + 0.1, sy + 0.5, 0]}>
          <Text
            fontSize={0.18}
            color="#fef3c7"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#78350f"
            font={undefined}
          >
            {`💬 ${building.memories.length}`}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
