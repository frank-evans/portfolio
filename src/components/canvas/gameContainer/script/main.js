import { Sound } from './audio.js';
import { openModal } from './modal.js';
import './three.min.js';
import './GLTFLoader.js';
import './yuka.js';
import './modal.js';

/* initialize audio */
const fxLaser = new Sound("./sounds/laser-retro.mp3", 5, 0.13);
/* const fxExplode = new Sound("./sounds/explode.m4a", 1, 0.2); */
const fxExplode = new Sound("./sounds/explosion-low.mp3", 1, 0.3);

let modal1 = document.getElementById('modal1');
let modal2 = document.getElementById('modal2');
let modal3 = document.getElementById('modal3');

let model, rock, card, app, explode;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

/* document.body.appendChild(renderer.domElement); */
// Get a reference to the container element
const container = document.getElementById('game-container');

// Append the renderer to the container instead of the body
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//renderer.setClearColor(0x5A5A5A);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// x, y, z
//camera.position.set(0, 10, 2);
camera.position.set(0, 0, 30);

const ambientLight = new THREE.AmbientLight(0x333333, 8.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x2255cc, 3);
// current plane (x, y, z)
directionalLight.position.set(0, 0, 60);
scene.add(directionalLight);
// light directional visual helper
const helper = new THREE.DirectionalLightHelper( directionalLight, 0.3);
scene.add( helper );

// texture loader
const textureLoader = new THREE.TextureLoader();

// geometry initialization 
const Geometry = new THREE.PlaneGeometry(8, 8);

// card texture loading              ******************* update img *******************
// geometry initialization 
const cardGeometry = new THREE.PlaneGeometry(5, 7);
const cardTexture = textureLoader.load("./static/black-lotus.png");
cardTexture.rotation = 0.0;
const cardMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    //color: 0xddc0ff,
    color: 0x666666,
    map: cardTexture,
    //wireframe: true,
    transparent: true,
    flatShading : true,
});
card = new THREE.Mesh(cardGeometry, cardMaterial);
scene.add(card);
card.position.set(-10, 7, -5);

// app texture loading              ******************* update img *******************
const appTexture = textureLoader.load("./static/app.png");
appTexture.rotation = 0.0;
const appMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    //color: 0xddc0ff,
    color: 0x666666,
    map: appTexture,
    //wireframe: true,
    transparent: true,
});
app = new THREE.Mesh(cardGeometry, appMaterial);
scene.add(app);
app.position.set(0, 10, -5);

// asteroid texture loading
const rockTexture = textureLoader.load("./static/asteroid2.png");
rockTexture.rotation = 0.3;
const rockMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    //color: 0xddc0ff,
    color: 0xdddddd,
    map: rockTexture,
    //wireframe: true,
    transparent: true,
});
rock = new THREE.Mesh(Geometry, rockMaterial);
scene.add(rock);
rock.position.set(12, 7, -5);

// explosion texture loading
const explodeTexture = textureLoader.load("./static/explosion.gif");
const explodeMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    //color: 0xddc0ff,
    color: 0xdddddd,
    map: explodeTexture,
    //wireframe: true,
    transparent: true,
});
explode = new THREE.Mesh(Geometry, explodeMaterial);
scene.add(explode);
explode.position.set(0, 0, -5);

// Yuka AI vehicle initialization 
const vehicle = new YUKA.Vehicle();

vehicle.scale.set(0.60, 0.60, 0.60);
vehicle.position.set(0, 0, 0);

//vehicle.forward.set(0, -1, 0);
//vehicle.up.set(0, 0, 1);

vehicle.forward.set(0, -1, 0);
vehicle.up.set(1, 0, 0);

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}    

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const target = new YUKA.GameEntity();
//target.setRenderComponent(targetMesh, sync);
target.up.set(0, 0, 1);

entityManager.add(target);

// setting target deceleration and ship bounding box tolerance (target.position, 0.5, 0.3)
const arriveBehavior = new YUKA.ArriveBehavior(target.position, 0.15, 0.0);
//const arriveBehavior = new YUKA.ArriveBehavior((target.position.x, target.position.y, 0), 0.0, 0.3);

// adjust weight for fast response without overshooting target (5)
arriveBehavior.weight = 75;

vehicle.steering.add(arriveBehavior);

//target.position.set(0, 0, 1);

vehicle.maxSpeed = 8.0;

// The maximum turn rate of this game entity in radians per seconds
vehicle.maxTurnRate = Math.PI * 90;

const loader = new THREE.GLTFLoader();
//const ship = new THREE.Object3D();
const ship = new THREE.Group();

loader.load('./ship/Striker.blend03.glb', function(glb) {
    model = glb.scene;
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
    if (modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1) {
        raycaster.setFromCamera(mousePosition, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        for(let i = 0; i < intersects.length; i++) {
            if(intersects[i].object.name === 'plane') 
                target.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
        }
        laserClick = true;
    }
});

// bullet array
let bullets = [];

// limit shots per frames ********************** possible add as ship variable
let canShoot = 0;

// sync with AI time (YUKA)
const time = new YUKA.Time();

let m = new THREE.Matrix4();

let z = 1;

function animate(t) {
    /* modals = document.querySelectorAll('.modal.active');
    if (!modals.length) { */

    const delta = time.update().getDelta();

    // rotation correction at greater distance from center(pivot point, mostly Y) *Yuka logic keeps rotation axis at 0,0,0
    const toleranceX = 0.0005 - (Math.abs(ship.position.x) / 100);
    const toleranceY = 0.0001 - (Math.abs(ship.position.x) / 100);
    const toleranceZ = 0.0005 - (Math.abs(ship.position.x) / 100);

    // tilt animation * speed , * tolerance
    ship.rotation.x += Math.sin(t / 400) * (toleranceX);  
    ship.rotation.y += Math.sin(t / 400) * (toleranceY);
    ship.position.z += Math.sin(t / 400) * -(toleranceZ);

    // card default animation
    card.rotation.z -= Math.sin(t / 1200) * 0.0003;
    card.position.z += Math.sin(t / 800) * 0.0008;
    card.position.x -= Math.sin(t / 1600) * 0.001;
    card.position.y += Math.sin(t / 1400) * 0.001;

    // app default animation
    app.rotation.z -= Math.sin(t / 1200) * 0.0003;
    app.position.z -= Math.sin(t / 800) * 0.0008;
    app.position.x -= Math.sin(t / 1600) * 0.001;
    app.position.y -= Math.sin(t / 1400) * 0.001;

    // rock default animation
    rock.rotation.z += Math.sin(t / 1200) * 0.0003;
    rock.position.z += Math.sin(t / 800) * 0.0008;
    rock.position.x += Math.sin(t / 1600) * 0.001;
    rock.position.y += Math.sin(t / 1400) * 0.001;
    
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

        //if(posX < 0.5 && posX > -0.5 && posY < 0.5 && posY > -0.5){
        //   bullet.MeshBasicMaterial.transparent = true;
        //}
        

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

        let bullet = new THREE.Mesh(
            //new THREE.CapsuleGeometry( 0.2, 0.5, 4, 8 ),
            /* new THREE.SphereGeometry( 0.1, 1, 4, 8 ), */
            new THREE.SphereGeometry( 0.15, 6, 4, 0),
            /* new THREE.CylinderGeometry( 0.1, 0.1, 1.2, 4, 1, true, 0 , 2 * Math.PI ), */
            new THREE.MeshBasicMaterial({color:0xff0000}),
            /* new THREE.MeshBasicMaterial({color:0xFFEF1A}), */
        ); 
    
        /* bullet.applyMatrix4(local.position); */
        /* bullet.rotateX(180); */
        /* bullet.rotateY(local.position.y); */

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

        fxLaser.play();
    }

    // this goes in Animate, as laser gets in proximity of button **********************************************************************
    for(let index = 0; index < bullets.length; index += 1){
        // card hitbox
        if (bullets[index].position.x > (card.position.x - 1.0) && bullets[index].position.x < (card.position.x + 3.5)){
            if (bullets[index].position.y > (card.position.y - 3.8) && bullets[index].position.y < (card.position.y + 2.3) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                 openModal(modal1);
                 fxExplode.play();
            }    
        } 
        // app hitbox
        if (bullets[index].position.x > (app.position.x - 1.6) && bullets[index].position.x < (app.position.x + 2)){
            if (bullets[index].position.y > (app.position.y - 3.8) && bullets[index].position.y < (app.position.y + 1.5) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                 openModal(modal2);
                 fxExplode.play();
            }    
        } 
        // rock hitbox
        if (bullets[index].position.x > (rock.position.x - 5.0) && bullets[index].position.x < (rock.position.x + 0.0)){
            if (bullets[index].position.y > (rock.position.y - 2.5) && bullets[index].position.y < (rock.position.y + 2.5) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                 openModal(modal3);
                 fxExplode.play();
            }    
        } 
    }

    /* if (vehicle.velocity.x > 1.0 || vehicle.velocity.y > 1.0) {
        fxThrust.play();
    }
    else {
        fxThrust.stop();
    } */

    // timer for laser intervals
    if(canShoot > 0) canShoot -= 1;

    entityManager.update(delta);
    /* } */
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});