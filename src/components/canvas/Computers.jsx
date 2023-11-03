import { Suspense, useEffect, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, SpotLight, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';


const Computers = ({ isMobile }) => {
  //const computer = useGLTF("./desktop_pc/scene.glb");
  const computer = useGLTF("./room/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2.15}
      position={[-10, 100, -10]}
      groundColor='black' />
      {/* <SpotLight 
        position={[0, 0, 0]}
        ref={computer}
        distance={6}
        attenuation={5} 
        anglePower={4}
        angle={1.5}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      /> */}
      <pointLight intensity={2} 
        position={[0, -0.8, 0]}
      /> 
      <primitive 
        object={computer.scene}
        //scale={isMobile ? 0.7 : 0.75}
        scale={isMobile ? 1.0 : 1.5}
        //position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        position={isMobile ? [0, -3, 0] : [0, -3.25, 0]}
        //rotation={[-0.01, 0.15, -0.15]}
        rotation={[0.1, 0.45, -0.15]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // listener for dynamic screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // initial 'isMobile" value
    setIsMobile(mediaQuery.matches);

    // callback for changes to media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // callback listener for media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // remove listner when component is unmounted      *** Suspense fallback={<CanvasLoader />}
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI /2}
          minPolarAngle={Math.PI /2}
          maxAzimuthAngle={Math.PI /-0.68} 
          minAzimuthAngle={Math.PI /-0.56} 
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;