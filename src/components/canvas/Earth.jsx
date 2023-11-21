import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf');
  //const earth = useGLTF("./planet/earth.glb");

  return (
      <mesh>
        <hemisphereLight intensity={8.15}
          position={[0, 0, 0]}
          groundColor='black' />
        {/* <pointLight intensity={8} 
          position={[0, -0.8, 0]}
        />  */}
        <primitive 
          object={earth.scene}
          //scale={isMobile ? 0.7 : 0.75}
          scale={2.0}
          //position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
          position={[0, 0, 0]}
          //rotation={[-0.01, 0.15, -0.15]}
          rotation={[0, 0, 0]}
        />
      </mesh>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI /2}
          minPolarAngle={Math.PI /2}
        />

        <Earth />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;