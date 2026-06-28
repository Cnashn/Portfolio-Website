import React, { Suspense, useRef, useEffect } from 'react'

import { Canvas } from '@react-three/fiber';
import {
  Decal,Float,OrbitControls,useTexture,Preload
} from '@react-three/drei';

import CanvasLoader from '../Loader';

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.8}
      floatIntensity={0}
      floatingRange={[0, 0]}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0,0,0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0,0,1]}
          rotation={[2*Math.PI,0,6.25]}
          flatShading
          scale={1.5}
          map={decal}
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({icon}) => {
  const controlsRef = useRef();

  useEffect(() => {
    const handler = () => controlsRef.current?.reset();
    document.addEventListener('reset-balls', handler);
    return () => document.removeEventListener('reset-balls', handler);
  }, []);

  return (
    <Canvas
      resize={{scroll:false}}
      frameloop='demand'
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls ref={controlsRef} enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas
