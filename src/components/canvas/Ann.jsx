
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations, Center } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import CanvasLoader from "../Loader";

const Model = ({ isMobile }) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/ann/artificial_neural_network_ann.glb");
  const { actions } = useAnimations(animations, group);
  const [modelScale, setModelScale] = useState(isMobile ? 0.03 : 0.045);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fallbackScale = isMobile ? 0.03 : 0.045;
    const target = isMobile ? 18 : 42; 
    if (!maxDim) {
      setModelScale(fallbackScale);
      return;
    }
    const minScale = isMobile ? 0.015 : 0.024;
    const maxScale = isMobile ? 0.059 : 0.095; 

    const fittedScale = (target / maxDim) * 0.95;
    const clamped = Math.min(Math.max(fittedScale, minScale), maxScale);
    setModelScale(clamped);
  }, [scene, isMobile]);

  useEffect(() => {
    const clip = actions?.Idle || actions?.[Object.keys(actions || {})[0]];
    clip?.reset().fadeIn(0.3).play();
    return () => clip?.fadeOut(0.2);
  }, [actions]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={group} dispose={null}>
      <Center disableY>
        <primitive
          object={scene}
          scale={modelScale}
          position={[0, -1.5, -2]} // centered under the hero copy
          rotation={[0.02, 0.1, 0]}
        />
      </Center>
    </group>
  );
};

const AnnCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      className={`absolute inset-0 z-10 ${isMobile ? "pointer-events-none" : ""}`}
      frameloop="always"
      shadows={false}
      dpr={[1, 1.5]}
      camera={{ position: [6.5, 2.4, 11], fov: 32 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={1.38} // lock vertical angle so you can only rotate left/right (yaw)
            maxPolarAngle={1.38}
          />
        )}
        <hemisphereLight intensity={1.2} groundColor="black" />
        <directionalLight position={[6, 8, 6]} intensity={1.5} />
        <spotLight position={[-8, 12, 4]} angle={0.3} penumbra={0.7} intensity={1.6} />
        <pointLight position={[2, 1.5, 3]} intensity={3.5} distance={12} />
        <Model isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default AnnCanvas;

