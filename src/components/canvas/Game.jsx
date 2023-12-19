import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
/* import * as YUKA from './gameContainer/script/yuka.js'; */
/* import { Vehicle, ArriveBehavior, EntityManager, GameEntity, Time } from './gameContainer/script/yuka.js'; */
import { Vehicle, ArriveBehavior, EntityManager, GameEntity, Time } from 'yuka';
import * as THREE from 'three';
/* import './gameContainer/script/GLTFLoader.js'; */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import asteroid from './gameContainer/static/asteroid2.png';

import CanvasLoader from '../Loader';


/* const Game = ({ isMobile }) => { */
const GameCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    const ambientLight = new THREE.AmbientLight(0x333333, 8.5);
    scene.add(ambientLight);

    // texture loader
    const textureLoader = new THREE.TextureLoader();

    // asteroid texture loading
    const rock = textureLoader.load(asteroid);
    rock.rotation = 0.3;

    // asteroid 1 initialization 
    const rockGeometry = new THREE.PlaneGeometry(8, 8);

    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: rock,
      transparent: true,
    });

    const mesh = new THREE.Mesh(rockGeometry, rockMaterial);
    scene.add(mesh);

    mesh.position.set(-7,7,0);

    // Yuka AI vehicle initialization 
    const vehicle = new Vehicle();

    // implement the rest of the main.js functionality here
    vehicle.scale.set(0.60, 0.60, 0.60);
    vehicle.position.set(0, 0, 0);
    vehicle.forward.set(0, -1, 0);
    vehicle.up.set(1, 0, 0);

    function sync(entity, renderComponent) {
        renderComponent.matrix.copy(entity.worldMatrix);
    }    

    const entityManager = new EntityManager();
    entityManager.add(vehicle);

    const target = new GameEntity();
    //target.setRenderComponent(targetMesh, sync);
    target.up.set(0, 0, 1);

    entityManager.add(target);

    // setting target deceleration and ship bounding box tolerance (target.position, 0.5, 0.3)
    const arriveBehavior = new ArriveBehavior(target.position, 0.15, 0.0);

    // adjust weight for fast response without overshooting target (5)
    arriveBehavior.weight = 75;

    vehicle.steering.add(arriveBehavior);

    //target.position.set(0, 0, 1);

    vehicle.maxSpeed = 8.0;

    // The maximum turn rate of this game entity in radians per seconds
    vehicle.maxTurnRate = Math.PI * 90;

    //const ship = new THREE.Object3D();
    const ship = new THREE.Group();

    /* const loader = new THREE.GLTFLoader(); */
    const loader = new GLTFLoader(); 
   /*  const model = useLoader(GLTFLoader, "./ship/Striker.blend03.glb");
    model.matrixAutoUpdate = false;
    ship.add(model);
    scene.add(ship);
    vehicle.setRenderComponent(model, sync); */

    loader.load("./ship/Striker.blend03.glb", function(glb) {
        let model = glb.scene;
        model.matrixAutoUpdate = false;
        
        //wireframe 
        model.traverse ( ( o ) => {
        if ( o.isMesh ) {
        o.material.metalness = false;
        o.material.wireframe = false;
        }
      } );

        ship.add(model);
        scene.add(ship);
        vehicle.setRenderComponent(model, sync);
    });

    const mousePosition = new THREE.Vector3();

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', function(e) {
        mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
        mousePosition.z = 1;
        //test **********************************************************************
        mouseX = (e.clientX - window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2);
    });

    const planeGeo = new THREE.PlaneGeometry(45, 45, 10, 10);
    const planeMat = new THREE.MeshBasicMaterial({
        visible: false,
        wireframe : true,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    //planeMesh.rotation.z = -0.5;
    scene.add(planeMesh);
    planeMesh.name = 'plane';
    planeMesh.position.set(0, 0, 0);

    const raycaster = new THREE.Raycaster();

    // mousedown variable for lasers
    let laserClick = false;

    // test with 'click' and mousedown
    window.addEventListener('mousedown', function() {
        
        //if (overlay.style.opacity = "0") {
            raycaster.setFromCamera(mousePosition, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            for(let i = 0; i < intersects.length; i++) {
                if(intersects[i].object.name === 'plane') 
                    target.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
            }
            laserClick = true;
        //}
    });

    // bullet array
    let bullets = [];

    // limit shots per frames ********************** possible add as ship variable
    let canShoot = 0;

    // sync with AI time (YUKA)
    const time = new Time();

    let m = new THREE.Matrix4();

    let z = 1;

    const animate = (t) => {
      const delta = time.update().getDelta();

      // rotation correction at greater distance from center(pivot point, mostly Y) *Yuka logic keeps rotation axis at 0,0,0
      const toleranceX = 0.0005 - (Math.abs(ship.position.x) / 100);
      const toleranceY = 0.0001 - (Math.abs(ship.position.x) / 100);
      const toleranceZ = 0.0005 - (Math.abs(ship.position.x) / 100);

      // tilt animation * speed , * tolerance
      ship.rotation.x += Math.sin(t / 400) * (toleranceX);  
      ship.rotation.y += Math.sin(t / 400) * (toleranceY);
      ship.position.z += Math.sin(t / 400) * -(toleranceZ);
      
      // asteroid 1 default animation
      mesh.rotation.z += Math.sin(t / 1200) * 0.0003;
      mesh.position.z += Math.sin(t / 800) * 0.0008;
      mesh.position.x += Math.sin(t / 1600) * 0.001;
      mesh.position.y += Math.sin(t / 1400) * 0.001;
      
      // laser array updates
      for(let index = 0; index < bullets.length; index += 1){
          if( bullets[index] === undefined) continue;
          if( bullets[index].alive == false) {
              bullets.splice(index, 1);
              continue;
          }

          bullets[index].position.add(bullets[index].velocity);
      }

      // ship laser
      if(laserClick && canShoot <= 0){
          let bullet = new THREE.Mesh(
              //new THREE.CapsuleGeometry( 0.2, 0.5, 4, 8 ),
              new THREE.SphereGeometry( 0.1, 1, 4, 8 ),
              new THREE.MeshBasicMaterial({color:0xff0000}),
          ); 

          // variables to convert target world space to ship local space
          let posX;
          let posY;

          const local = new THREE.Object3D();
          
          // Try Math.sign( local x) to apply the matrix to -1 on the Z
          if(target.position.x > vehicle.position.x) {
              posX = Math.abs(target.position.x - vehicle.position.x);
          } else {
              posX = Math.abs(vehicle.position.x - target.position.x) * -1;
          }

          if(target.position.y > vehicle.position.y) {
              posY = Math.abs(target.position.y - vehicle.position.y);
          } else {
              posY = Math.abs(vehicle.position.y - target.position.y) * -1;
          }

          //test.position.set(target.position.x, target.position.y, 0);
          local.position.set(posX, posY, 0);

          // convert to mornal vector as volocity is constant in this direction
          local.position.normalize();

          // correct yuka steering behavior mesh flip on -x values
          if(z != Math.sign(local.position.x)){
              ship.applyMatrix(new THREE.Matrix4().makeScale(1, 1, -1));
              ship.updateMatrix();
              z = Math.sign(local.position.x);
          }

          // position lasers to come from ship
          bullet.position.set(
              vehicle.position.x + (local.position.x) * 1.5,
              vehicle.position.y + (local.position.y) * 1.5,
              vehicle.position.z,
          ); 
          
          // set laser velocity
          bullet.velocity = new THREE.Vector3(
              //-Math.sin(vehicle.rotation.y),
              //0,
              //Math.cos(vehicle.rotation.y),

              (local.position.x) *0.5,
              (local.position.y) *0.5,
              0,
          );

          // time limit on laser life
          bullet.alive = true;
          setTimeout(function(){
              bullet.alive = false;
              scene.remove(bullet);
          }, 1000 * 3);

          // add to scene, array, and set frame delay
          bullets.push(bullet);
          scene.add(bullet);
          canShoot = 10;
          laserClick = false;
      }

      const test1 = document.getElementById('button1');
      //const test2 = document.getElementById('button2');

      // this goes in Animate, as laser gets in proximity of button **********************************************************************
      for(let index = 0; index < bullets.length; index += 1){
          console.log(bullets[index].position.y);

          // at planegeometry (8, 8), mesh.x -3.5, +2  mesh.y -1.5, +3.5
          if (bullets[index].position.x > (mesh.position.x - 3.5) && bullets[index].position.x < (mesh.position.x + 2)){
              if (bullets[index].position.y > (mesh.position.y - 1.5) && bullets[index].position.y < (mesh.position.y + 3.5)){
                  openModal(modal1);
              }    
          } 
      }

      // timer for laser intervals
      if(canShoot > 0) canShoot -= 1;

      entityManager.update(delta);

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    mountRef.current.appendChild(renderer.domElement);
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

const GameCanvas2 = () => {
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
        {/* <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI /2}
          minPolarAngle={Math.PI /2}
          maxAzimuthAngle={Math.PI /-0.68} 
          minAzimuthAngle={Math.PI /-0.56} 
        /> */}
        <Game isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default GameCanvas;