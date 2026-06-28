import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Building, useCampusStore } from '../store/campusStore';
import BuildingMesh from './BuildingMesh';
import CampusGround from './CampusGround';

interface CampusSceneProps {
  onBuildingSelect: (building: Building) => void;
}

export default function CampusScene({ onBuildingSelect }: CampusSceneProps) {
  const { buildings, selectedBuilding, isZooming, setIsZooming, setShowMemoryWall } = useCampusStore();
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const targetPos = useRef(new THREE.Vector3(0, 10, 14));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const animating = useRef(false);
  const animProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const startLook = useRef(new THREE.Vector3());

  useEffect(() => {
    camera.position.set(0, 10, 14);
    camera.lookAt(0, 0, 0);
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      const [bx, , bz] = selectedBuilding.position;
      const [sx, sy, sz] = selectedBuilding.size;
      const zoomDist = Math.max(sx, sz) * 2.2 + 2;
      targetPos.current.set(bx, sy * 1.8 + 2.5, bz + zoomDist);
      targetLook.current.set(bx, sy / 2, bz);

      startPos.current.copy(camera.position);
      startLook.current.set(0, 0, 0);
      animProgress.current = 0;
      animating.current = true;
      setIsZooming(true);

      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
    } else {
      targetPos.current.set(0, 10, 14);
      targetLook.current.set(0, 0, 0);
      startPos.current.copy(camera.position);
      animProgress.current = 0;
      animating.current = true;
      setIsZooming(true);

      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
    }
  }, [selectedBuilding]);

  useFrame((_, delta) => {
    if (animating.current) {
      animProgress.current = Math.min(1, animProgress.current + delta * 1.5);
      const t = easeInOutCubic(animProgress.current);

      camera.position.lerpVectors(startPos.current, targetPos.current, t);

      const curLook = new THREE.Vector3().lerpVectors(startLook.current, targetLook.current, t);
      camera.lookAt(curLook);

      if (animProgress.current >= 1) {
        animating.current = false;
        setIsZooming(false);

        if (selectedBuilding) {
          setTimeout(() => setShowMemoryWall(true), 100);
          if (controlsRef.current) {
            controlsRef.current.target.copy(targetLook.current);
          }
        } else {
          if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.enabled = true;
          }
        }
      }
    }
  });

  const handleBuildingClick = (building: Building) => {
    if (isZooming) return;
    onBuildingSelect(building);
  };

  return (
    <>
      <Sky sunPosition={[100, 50, 100]} turbidity={0.3} rayleigh={0.5} />
      <Stars radius={60} depth={30} count={800} factor={2} fade />

      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight args={['#bfdbfe', '#86efac', 0.5]} />
      <pointLight position={[0, 8, 0]} intensity={0.3} color="#fef3c7" />

      <CampusGround />

      {buildings.map((building) => (
        <BuildingMesh
          key={building.id}
          building={building}
          onClick={handleBuildingClick}
          isSelected={selectedBuilding?.id === building.id}
          isAnySelected={!!selectedBuilding}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={4}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        target={[0, 0, 0]}
      />
    </>
  );
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
