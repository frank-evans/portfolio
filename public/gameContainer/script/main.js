import { musicInit } from './musicInit.js';
import { Sound, audioMusic } from './audio.js';
import { openModal } from './modal.js';
import { CSS2DRenderer, CSS2DObject } from './CSS2DRenderer.js';
/* import explosion from '../static/explosion.gif'; */
import './three.min.js';
import './GLTFLoader.js';
import './yuka.js';

const filterToggle = document.getElementById('filter-toggle');
filterToggle.addEventListener('click', function() {
    var svgFilter = document.getElementById('svg-filter');
    var displayStyle = window.getComputedStyle(svgFilter).display;
    if (displayStyle === 'none') {
        filterToggle.src = "./static/perf.png";
        svgFilter.style.display = 'block';
    } else {
        filterToggle.src = "./static/perfRed.png";
        svgFilter.style.display = 'none';
    }
});

const tutorial = document.getElementById('tutorial');

let fxLaser, fxExplode, fxHit, fxHit2;

window.onload = function() {
    /* initialize audio */
    fxLaser = new Sound("./sounds/laser-retro.mp3", 5, 0.13);
    fxExplode = new Sound("./sounds/explosion-low.mp3", 1, 0.3);
    // separate sound effects for small rocks to avoid clipping
    fxHit = new Sound("./sounds/explosion-low.mp3", 1, 0.15);
    fxHit2 = new Sound("./sounds/explosion-low.mp3", 4, 0.15);

    tutorial.style.display = 'initial';
};

let modal1 = document.getElementById('modal1');
let modal2 = document.getElementById('modal2');
let modal3 = document.getElementById('modal3');

let model, rock, card, app, rockSmall, rockSmall2, rockSmall3, rockSmall4;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});

/* renderer.setSize(window.innerWidth, window.innerHeight); */
renderer.setSize(window.innerWidth, (window.innerWidth * 0.56));

/* document.body.appendChild(renderer.domElement); */
// Get a reference to the container element
const container = document.getElementById('game-container');

// Append the renderer to the container instead of the body
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//renderer.setClearColor(0x5A5A5A);

const camera = new THREE.PerspectiveCamera(
    45,
    /* window.innerWidth / window.innerHeight, */
    window.innerWidth / (window.innerWidth * 0.56),
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

// CSS2DRenderer initialization ***
const labelRenderer = new CSS2DRenderer();
/* labelRenderer.setSize(window.innerWidth, window.innerHeight); */
labelRenderer.setSize(window.innerWidth, (window.innerWidth * 0.56));
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
//document.body.appendChild(labelRenderer.domElement);
container.appendChild(labelRenderer.domElement);

// texture loader
const textureLoader = new THREE.TextureLoader();

// card texture loading
// geometry initialization 
const cardGeometry = new THREE.PlaneGeometry(5, 7);
const cardTexture = textureLoader.load("./static/black-lotus.png");
cardTexture.rotation = 0.0;
const cardMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    opacity: 1.0,
    color: 0x666666,
    map: cardTexture,
    transparent: true,
    flatShading : true,
});
card = new THREE.Mesh(cardGeometry, cardMaterial);
scene.add(card);
card.position.set(-10, 7, -7);

// app texture loading
const appTexture = textureLoader.load("./static/app.png");
appTexture.rotation = 0.0;
const appMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    color: 0x666666,
    map: appTexture,
    transparent: true,
});
app = new THREE.Mesh(cardGeometry, appMaterial);
scene.add(app);
app.position.set(0, 10, -7);

// asteroid texture loading
// geometry initialization 
const boxGeometry = new THREE.PlaneGeometry(7.5, 5.5);
const boxTexture = textureLoader.load("./static/GameBox.png");
const rockMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    color: 0x777777,
    map: boxTexture,
    transparent: true,
});
rock = new THREE.Mesh(boxGeometry, rockMaterial);
scene.add(rock);
rock.position.set(12, 7, -7);

// SMALL ROCK 
const Geometry2 = new THREE.PlaneGeometry(3, 3);
const rockTexture = textureLoader.load("./static/asteroid2.png");
rockTexture.rotation = 0.3;
const rockMaterial2 = new THREE.MeshStandardMaterial({
   /*  color: 0xdddddd, */
    color: 0xbbbbbb,
    map: rockTexture,
    transparent: true,
});
rockSmall = new THREE.Mesh(Geometry2, rockMaterial2);
scene.add(rockSmall);
rockSmall.position.set(12, -5, -5);

// SMALL ROCK 2 
const rockMaterial3 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: rockTexture,
    transparent: true,
});
rockSmall2 = new THREE.Mesh(Geometry2, rockMaterial3);
scene.add(rockSmall2);
rockSmall2.position.set(-12, -5, -5);

// SMALL ROCK 3 
const rockMaterial4 = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    map: rockTexture,
    transparent: true,
});
rockSmall3 = new THREE.Mesh(Geometry2, rockMaterial4);
scene.add(rockSmall3);
rockSmall3.position.set(20, 2, -5);

// SMALL ROCK 4 
const rockMaterial5 = new THREE.MeshStandardMaterial({
    color: 0xbbbbbb,
    map: rockTexture,
    transparent: true,
});
rockSmall4 = new THREE.Mesh(Geometry2, rockMaterial5);
scene.add(rockSmall4);
rockSmall4.position.set(-20, -2, -5);

// CSS2DRenderer initialization for explosion gif (html)
const imgExplodeLg = document.createElement('img');
imgExplodeLg.src = './static/explosion.gif';
const div = document.createElement('div');
div.appendChild(imgExplodeLg);
const divContainer = new CSS2DObject(div);
scene.add(divContainer);
divContainer.position.set(0, 100, -7);
// Set initial size
const widthPercentage = 50; // 45% of window width
/* imgExplodeLg.style.height = (window.innerHeight * heightPercentage / 100) + 'px'; */
imgExplodeLg.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
/* imgExplodeLg.style.height = (window.innerHeight * (window.innerWidth * 0.56) / 100) + 'px'; */
imgExplodeLg.style.display = 'none';
/* imgExplodeLg.style.display = 'initial'; */

// CSS2DRenderer initialization for explosionSMALL gif (html) 
const imgExplodeSm1 = document.createElement('img');
imgExplodeSm1.src = './static/lowExplosionShort.gif';
const div2 = document.createElement('div');
div2.appendChild(imgExplodeSm1);
const divContainer2 = new CSS2DObject(div2);
scene.add(divContainer2);
divContainer2.position.set(0, 100, -5);
// Set initial size
const widthPercentage2 = 45; // 45% of window width
imgExplodeSm1.style.width = (window.innerWidth * widthPercentage2 / 100) + 'px';
imgExplodeSm1.style.display = 'none';
imgExplodeSm1.style.opacity = 1.0;

// force different gif loop for rockSmall2          
const imgExplodeSm2 = document.createElement('img');
imgExplodeSm2.src = './static/lowExplosionShort.gif?'+ Math.random();
const div3 = document.createElement('div');
div3.appendChild(imgExplodeSm2);
const divContainer3 = new CSS2DObject(div3);
scene.add(divContainer3);
divContainer3.position.set(0, 10, -5);
imgExplodeSm2.style.width = (window.innerWidth * widthPercentage2 / 100) + 'px';
imgExplodeSm2.style.display = 'none';
imgExplodeSm2.style.opacity = 1.0;

// force different gif loop for rockSmall3          
const imgExplodeSm3 = document.createElement('img');
imgExplodeSm3.src = './static/lowExplosionShort.gif?'+ Math.random();
const div4 = document.createElement('div');
div4.appendChild(imgExplodeSm3);
const divContainer4 = new CSS2DObject(div4);
scene.add(divContainer4);
divContainer4.position.set(0, 10, -5);
imgExplodeSm3.style.width = (window.innerWidth * widthPercentage2 / 100) + 'px';
imgExplodeSm3.style.display = 'none';
imgExplodeSm3.style.opacity = 1.0;

// force different gif loop for rockSmall3             
const imgExplodeSm4 = document.createElement('img');
imgExplodeSm4.src = './static/lowExplosionShort.gif?'+ Math.random();
const div5 = document.createElement('div');
div5.appendChild(imgExplodeSm4);
const divContainer5 = new CSS2DObject(div5);
scene.add(divContainer5);
divContainer5.position.set(0, 10, -5);
imgExplodeSm4.style.width = (window.innerWidth * widthPercentage2 / 100) + 'px';
imgExplodeSm4.style.display = 'none';
imgExplodeSm4.style.opacity = 1.0;

// Yuka AI vehicle initialization 
const vehicle = new YUKA.Vehicle();

vehicle.scale.set(0.60, 0.60, 0.60);
/* vehicle.position.set(-11, 20, 0); */
vehicle.position.set(0, 0, 0);

vehicle.forward.set(0, -1, 0);
vehicle.up.set(1, 0, 0);

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}    

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const target = new YUKA.GameEntity();
target.up.set(0, 0, 1);
target.position.set(0, 0, 0);

entityManager.add(target);

// setting target deceleration and ship bounding box tolerance (target.position, 0.5, 0.3)
/* const arriveBehavior = new YUKA.ArriveBehavior(target.position, 0.15 (0.5), 0.0); */
const arriveBehavior = new YUKA.ArriveBehavior(target.position, 0.3, 0.0);

// adjust weight for fast response without overshooting target (5)
/* arriveBehavior.weight = 75; (10) */
arriveBehavior.weight = 40;

vehicle.steering.add(arriveBehavior);

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

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    /* mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1; */
    mousePosition.y = -(e.clientY / (this.window.innerWidth * 0.56)) * 2 + 1;
    mousePosition.z = 1;
});

/* const planeGeo = new THREE.PlaneGeometry(60, 25, 10, 10); */
const planeGeo = new THREE.PlaneGeometry(60, 25, 10, 10);
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
    if (!(tutorial.style.display == 'none')) {
        tutorial.style.display = 'none';
    }
    if (overlay.classList.length == 0 && !(imgExplodeLg.style.display == 'initial') && !(music.matches(":hover")) && !(filterToggle.matches(":hover"))) {
        raycaster.setFromCamera(mousePosition, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        for(let i = 0; i < intersects.length; i++) {
            if(intersects[i].object.name === 'plane') 
                target.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
                laserClick = true;

                // audioMusic initialization
                if (musicInit.stat == false) {
                    music.src = "./static/mNote.png";
                    audioMusic.load();
                    audioMusic.play();
                    audioMusic.muted = false;
                    musicInit.stat = true;
                }
        }
    }
});

function fade(r) {
    if (r.style.opacity == 1.0) {
        r.style.opacity = 0.9;
    } 
}

function respawn(r, y, t) {
    if (overlay.classList.length == 0) {
        setTimeout (() => {
            scene.add(r);
            r.material.opacity = 0.0;
            r.position.y = y;
        }, t * 1000);
    } else {
        setTimeout (() => {  
            respawn(r, y, t);
        }, 1000);
    }
}

// bullet array
let bullets = [];

// limit shots per frames 
let canShoot = 0;

// sync with AI time (YUKA)
const time = new YUKA.Time();

let z = 1;

// flipMatrix to correct Yuka steering behavior mesh flip on -x values
const flipMatrix = new THREE.Matrix4().makeScale(1, 1, -1);

// window blur/focus event listeners to correct vehicle position on return
let savedPositionV, savedPositionT, savedMatrix;

// from Navbar.jsx
window.addEventListener('message', function(event) {
    if (event.data === 'observeOn') {
        if (vehicle.position) {
        vehicle.position.copy(savedPositionV);
        } else {
            vehicle.position.set(0, 0, 0);
        }
        if (target.position) {
            target.position.copy(savedPositionT);
        } else {
            target.position.set(0, 0, 0);
        }

    } else if (event.data === 'observeOff') {
        savedPositionV = vehicle.position.clone();
        savedPositionT = target.position.clone();
    
      } else if (event.data === 'navOn') {
        vehicle.position.copy(savedPositionV);
        target.position.copy(savedPositionT);

      } else if (event.data === 'navOff') {
        vehicle.position.set(0, 0, 0);
        target.position.set(0, 0, 0);
      }
  }, false);

function animate(t) {
    const delta = time.update().getDelta();

    // rotation correction at greater distance from center(pivot point, mostly Y) *Yuka logic keeps rotation axis at 0,0,0
    const toleranceX = 0.0005 - (Math.abs(ship.position.x) / 100);
    const toleranceY = 0.0001 - (Math.abs(ship.position.x) / 100);
    const toleranceZ = 0.0005 - (Math.abs(ship.position.x) / 100);

    // tilt animation * speed , * tolerance
    ship.rotation.x += Math.sin(t / 600) * (toleranceX);  
    ship.rotation.y += Math.sin(t / 400) * (toleranceY);
    ship.position.z += Math.sin(t / 400) * -(toleranceZ);

    // card default animation
    card.rotation.z -= Math.sin(t / 1800) * 0.0005;
    card.position.z += Math.sin(t / 800) * 0.0008;
    card.position.x -= Math.sin(t / 2400) * 0.002;
    card.position.y += Math.sin(t / 2100) * 0.002;

    // app default animation
    app.rotation.z -= Math.sin(t / 1200) * 0.0005;
    app.position.z -= Math.sin(t / 800) * 0.0008;
    app.position.x -= Math.sin(t / 1600) * 0.002;
    app.position.y -= Math.sin(t / 1400) * 0.002;

    // rock default animation
    rock.rotation.z += Math.sin(t / 1200) * 0.0005;
    rock.position.z += Math.sin(t / 800) * 0.0008;
    rock.position.x += Math.sin(t / 1600) * 0.002;
    rock.position.y += Math.sin(t / 1400) * 0.002;

    // rockSMALL default animation
    rockSmall.rotation.z += Math.sin(t / 3600) * 0.005;
    rockSmall.position.z += Math.sin(t / 400) * 0.0008;
    rockSmall.position.x -= Math.sin(t / 6400) * 0.01;
    rockSmall.position.y += Math.sin(t / 5600) * 0.01;
    
    // rockSMALL2 default animation 
    rockSmall2.rotation.z -= Math.sin(t / 4800) * 0.005;
    rockSmall2.position.z += Math.sin(t / 400) * 0.0008;
    rockSmall2.position.x += Math.sin(t / 7200) * 0.01;
    rockSmall2.position.y -= Math.sin(t / 6800) * 0.01;

    // rockSMALL3 default animation * speed , * tolerance
    rockSmall3.rotation.z -= Math.sin(t / 4800) * 0.0025;
    rockSmall3.position.z += Math.sin(t / 400) * 0.0008;
    rockSmall3.position.x += Math.sin(t / 8000) * 0.001;
    rockSmall3.position.y -= Math.sin(t / 8400) * 0.01;

    // rockSMALL4 default animation
    rockSmall4.rotation.z += Math.sin(t / 3600) * 0.0025;
    rockSmall4.position.z += Math.sin(t / 400) * 0.0008;
    rockSmall4.position.x -= Math.sin(t / 7200) * 0.001;
    rockSmall4.position.y += Math.sin(t / 7400) * 0.01;

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
            if( posX == 0.0) {
                posX = 0.001;
            }
        } else {
            posX = Math.abs(vehicle.position.x - target.position.x) * -1;
            if( posX == 0.0) {
                posX = 0.001;
            }
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

        if(z != Math.sign(local.position.x)){
            ship.applyMatrix(flipMatrix);
            z = Math.sign(local.position.x);
            ship.updateMatrix();
        }

        let bullet = new THREE.Mesh(
            //new THREE.CapsuleGeometry( 0.2, 0.5, 4, 8 ),
            /* new THREE.SphereGeometry( 0.1, 1, 4, 8 ), */
            new THREE.SphereGeometry( 0.15, 6, 4, 0),
            /* new THREE.CylinderGeometry( 0.1, 0.1, 1.2, 4, 1, true, 0 , 2 * Math.PI ), */
            new THREE.MeshBasicMaterial({color:0xff0000}),
            /* new THREE.MeshBasicMaterial({color:0xFFEF1A}), */
        ); 

        // position lasers to come from ship
        bullet.position.set(
            vehicle.position.x + (local.position.x) * 1.5,
            vehicle.position.y + (local.position.y) * 1.5,
            vehicle.position.z,
        ); 
        
        // set laser velocity
        bullet.velocity = new THREE.Vector3(
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
    
    // this goes in Animate, as laser gets in proximity of object 
    for(let index = 0; index < bullets.length; index += 1){
        // card hitbox
        if (bullets[index].position.x > (card.position.x - 1.0) && bullets[index].position.x < (card.position.x + 3.5) && !(imgExplodeLg.style.display == 'initial') && card.material.opacity >= 1.0){
            if (bullets[index].position.y > (card.position.y - 3.8) && bullets[index].position.y < (card.position.y + 2.3) && overlay.classList.length == 0){
                var originalSrc = imgExplodeLg.src.split('?')[0]; // Save the original src
                imgExplodeLg.src = ''; // Clear the current image
                imgExplodeLg.src = originalSrc + '?t=' + new Date().getTime(); // Set the src to the new URL
                /* divContainer.position.set(-11, 7, -5); */
                divContainer.position.set(card.position.x, card.position.y - 0.5, -7);
                imgExplodeLg.style.display = 'initial';
                fxExplode.play();

                setTimeout(() => {
                    openModal(modal1);
                }, 1.5 * 1000); 

                setTimeout(() => {
                    scene.remove(card);
                    card.position.y = 300;
                }, 2.0 * 1000); 

                setTimeout(() => {
                    imgExplodeLg.style.display = 'none';
                    divContainer.position.set(0, 100, -7);
                }, 3.5 * 1000);

                setTimeout(() => {
                    /* scene.add(card);
                    card.material.opacity = 0.0;
                    card.position.y = 7; */
                    respawn(card, 7, 7.0);
                }, 4.0 * 1000); 
            }    
        } 
        // app hitbox
        if (bullets[index].position.x > (app.position.x - 1.6) && bullets[index].position.x < (app.position.x + 2) && !(imgExplodeLg.style.display == 'initial') && app.material.opacity >= 1.0){
            if (bullets[index].position.y > (app.position.y - 3.8) && bullets[index].position.y < (app.position.y + 1.5) && overlay.classList.length == 0){
                var originalSrc = imgExplodeLg.src.split('?')[0];
                imgExplodeLg.src = ''; 
                imgExplodeLg.src = originalSrc + '?t=' + new Date().getTime(); 
                /* divContainer.position.set(0, 10, -5); */
                divContainer.position.set(app.position.x, app.position.y, -7);
                imgExplodeLg.style.display = 'initial';
                fxExplode.play();

                setTimeout(() => {
                    openModal(modal2);
                }, 1.5 * 1000); 

                setTimeout(() => {
                    scene.remove(app);
                    app.position.y = 300;
                }, 2.0 * 1000); 

                setTimeout(() => {
                    imgExplodeLg.style.display = 'none';
                    divContainer.position.set(0, 100, -7);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(app, 10, 7.0);
                }, 4.0 * 1000);
            }    
        } 
        // rock hitbox
        if (bullets[index].position.x > (rock.position.x - 5.5) && bullets[index].position.x < (rock.position.x + 1.0) && !(imgExplodeLg.style.display == 'initial') && rock.material.opacity >= 1.0){
            if (bullets[index].position.y > (rock.position.y - 3.5) && bullets[index].position.y < (rock.position.y + 1.0) && overlay.classList.length == 0){
                var originalSrc = imgExplodeLg.src.split('?')[0]; 
                imgExplodeLg.src = ''; 
                imgExplodeLg.src = originalSrc + '?t=' + new Date().getTime(); 
                /* divContainer.position.set(11, 8, -5); */
                divContainer.position.set(rock.position.x, rock.position.y, -7);
                imgExplodeLg.style.display = 'initial';
                fxExplode.play();

                setTimeout(() => {
                    openModal(modal3);
                }, 1.5 * 1000); 

                setTimeout(() => {
                    scene.remove(rock);
                    rock.position.y = 300;
                }, 2.0 * 1000); 

                setTimeout(() => {
                    imgExplodeLg.style.display = 'none';
                    divContainer.position.set(0, 100, -7);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rock, 8, 7.0);
                }, 4.0 * 1000);
            }    
        } 
        // rockSMALL hitbox
        if (bullets[index].position.x > (rockSmall.position.x - 3.0) && bullets[index].position.x < (rockSmall.position.x + 0.0) && rockSmall.material.opacity >= 1.0  && !(imgExplodeSm1.style.display == 'initial')){
            if (bullets[index].position.y > (rockSmall.position.y - 1.0) && bullets[index].position.y < (rockSmall.position.y + 1.7) && overlay.classList.length == 0){
                /* imgExplodeSm1.src = imgExplodeSm1.src; */
                var originalSrc = imgExplodeSm1.src.split('?')[0]; // Save the original src
                imgExplodeSm1.src = ''; // Clear the current image
                imgExplodeSm1.src = originalSrc + '?t=' + new Date().getTime(); // Set the src to the new URL
                /* divContainer2.position.set(11.5, -4.5, -5); */
                divContainer2.position.set(rockSmall.position.x, rockSmall.position.y, -5);
                imgExplodeSm1.style.display = 'initial';
                fxHit.play();

                setTimeout(() => {
                    scene.remove(rockSmall);
                    rockSmall.position.y = 300;
                }, 0.3 * 1000); 

                setTimeout(() => {
                    fade(imgExplodeSm1);
                }, 2.0 * 1000);

                setTimeout(() => {
                    imgExplodeSm1.style.display = 'none';
                    imgExplodeSm1.style.opacity = 1.0;
                    divContainer2.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rockSmall, -5, 3.0);
                }, 4.0 * 1000);
            }    
        } 
        // rockSMALL2 hitbox 
        if (bullets[index].position.x > (rockSmall2.position.x - 0.3) && bullets[index].position.x < (rockSmall2.position.x + 2.5) && rockSmall2.material.opacity >= 1.0  && !(imgExplodeSm2.style.display == 'initial')){
            if (bullets[index].position.y > (rockSmall2.position.y - 0.0) && bullets[index].position.y < (rockSmall2.position.y + 2.7) && overlay.classList.length == 0){
                var originalSrc = imgExplodeSm2.src.split('?')[0];
                imgExplodeSm2.src = '';
                imgExplodeSm2.src = originalSrc + '?t=' + new Date().getTime();
                /* divContainer3.position.set(-11.5, -4.5, -5); */
                divContainer3.position.set(rockSmall2.position.x, rockSmall2.position.y, -5);
                imgExplodeSm2.style.display = 'initial';
                fxHit2.play();

                setTimeout(() => {
                    scene.remove(rockSmall2);
                    rockSmall2.position.y = 300;
                }, 0.3 * 1000); 

                setTimeout(() => {
                    fade(imgExplodeSm2);
                }, 2.0 * 1000);

                setTimeout(() => {
                    imgExplodeSm2.style.display = 'none';
                    imgExplodeSm2.style.opacity = 1.0;
                    divContainer3.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rockSmall2, -5, 3.0);
                }, 4.0 * 1000);
            }    
        } 
        // rockSMALL3 hitbox 
        if (bullets[index].position.x > (rockSmall3.position.x - 4.3) && bullets[index].position.x < (rockSmall3.position.x - 1.5) && rockSmall3.material.opacity >= 1.0  && !(imgExplodeSm3.style.display == 'initial')){
            if (bullets[index].position.y > (rockSmall3.position.y - 1.0) && bullets[index].position.y < (rockSmall3.position.y + 1.7) && overlay.classList.length == 0){
                var originalSrc = imgExplodeSm3.src.split('?')[0];
                imgExplodeSm3.src = '';
                imgExplodeSm3.src = originalSrc + '?t=' + new Date().getTime(); 
                /* divContainer4.position.set(-11.5, -4.5, -5); */
                divContainer4.position.set(rockSmall3.position.x, rockSmall3.position.y, -5);
                imgExplodeSm3.style.display = 'initial';
                fxHit2.play();

                setTimeout(() => {
                    scene.remove(rockSmall3);
                    rockSmall3.position.y = 300;
                }, 0.3 * 1000); 

                setTimeout(() => {
                    fade(imgExplodeSm3);
                }, 2.0 * 1000);

                setTimeout(() => {
                    imgExplodeSm3.style.display = 'none';
                    imgExplodeSm3.style.opacity = 1.0;
                    divContainer4.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rockSmall3, 2, 3.0);
                }, 4.0 * 1000);
            }    
        } 
        // rockSMALL4 hitbox 
        if (bullets[index].position.x > (rockSmall4.position.x + 0.7) && bullets[index].position.x < (rockSmall4.position.x + 3.5) && rockSmall4.material.opacity >= 1.0  && !(imgExplodeSm4.style.display == 'initial')){
            if (bullets[index].position.y > (rockSmall4.position.y - 1.0) && bullets[index].position.y < (rockSmall4.position.y + 1.7) && overlay.classList.length == 0){
                var originalSrc = imgExplodeSm4.src.split('?')[0];
                imgExplodeSm4.src = '';
                imgExplodeSm4.src = originalSrc + '?t=' + new Date().getTime();
                /* divContainer5.position.set(-11.5, -4.5, -5); */
                divContainer5.position.set(rockSmall4.position.x, rockSmall4.position.y, -5);
                imgExplodeSm4.style.display = 'initial';
                fxHit2.play();

                setTimeout(() => {
                    scene.remove(rockSmall4);
                    rockSmall4.position.y = 300;
                }, 0.3 * 1000); 

                setTimeout(() => {
                    fade(imgExplodeSm4);
                }, 2.0 * 1000);

                setTimeout(() => {
                    imgExplodeSm4.style.display = 'none';
                    imgExplodeSm4.style.opacity = 1.0;
                    divContainer5.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rockSmall4, -2, 3.0);
                }, 4.0 * 1000);
            }    
        } 
    }

    if (overlay.classList.length == 0) {
        // slowly fade in opacity of card, app, and rock
        if (card.material.opacity < 1.0) {
            card.material.opacity += 0.01;
        }
        if (app.material.opacity < 1.0) {
            app.material.opacity += 0.01;
        }
        if (rock.material.opacity < 1.0) {
            rock.material.opacity += 0.01;
        }
        if (rockSmall.material.opacity < 1.0) {
            rockSmall.material.opacity += 0.01;
        }
        if (rockSmall2.material.opacity < 1.0) {
            rockSmall2.material.opacity += 0.01;
        }
        if (rockSmall3.material.opacity < 1.0) {
            rockSmall3.material.opacity += 0.01;
        }
        if (rockSmall4.material.opacity < 1.0) {
            rockSmall4.material.opacity += 0.01;
        }
    }

    if (parseFloat(imgExplodeSm1.style.opacity) < 1.0 && parseFloat(imgExplodeSm1.style.opacity) > 0.0) {
        imgExplodeSm1.style.opacity -= 0.01;
    }
    if (parseFloat(imgExplodeSm2.style.opacity) < 1.0 && parseFloat(imgExplodeSm2.style.opacity) > 0.0) {
        imgExplodeSm2.style.opacity -= 0.01;
    }
    if (parseFloat(imgExplodeSm3.style.opacity) < 1.0 && parseFloat(imgExplodeSm3.style.opacity) > 0.0) {
        imgExplodeSm3.style.opacity -= 0.01;
    }
    if (parseFloat(imgExplodeSm4.style.opacity) < 1.0 && parseFloat(imgExplodeSm4.style.opacity) > 0.0) {
        imgExplodeSm4.style.opacity -= 0.01;
    }

    // timer for laser intervals
    if(canShoot > 0) canShoot -= 1;
    
    entityManager.update(delta);
    
    labelRenderer.render(scene, camera);

    renderer.render(scene, camera);
}

// Start the animation loop
renderer.setAnimationLoop(animate);

document.addEventListener('blur', function() {
    if (vehicle.position) {
        savedPositionV = vehicle.position.clone();
    }
    if (target.position) {
        savedPositionT = target.position.clone();
    }
}, true); // Use capture phase to catch the event as it bubbles up

document.addEventListener('focus', function() {
    if (vehicle.position) {
        vehicle.position.copy(savedPositionV);
    }
    if (target.position) {
        target.position.copy(savedPositionT);
    }
}, true); // Use capture phase to catch the event as it bubbles up

let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        /* camera.aspect = window.innerWidth / window.innerHeight; */
        camera.aspect = window.innerWidth / (window.innerWidth * 0.56);
        camera.updateProjectionMatrix();
    /*  renderer.setSize(window.innerWidth, window.innerHeight); */
        renderer.setSize(window.innerWidth, (window.innerWidth * 0.56));
        /* labelRenderer.setSize(window.innerWidth, window.innerHeight); */
        labelRenderer.setSize(window.innerWidth, (window.innerWidth * 0.56));

        // CSS2DRenderer resize (explosion gif)
        /* imgExplodeLg.style.height = (window.innerHeight * heightPercentage / 100) + 'px'; */
        imgExplodeLg.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
        imgExplodeSm1.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
        imgExplodeSm2.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
        imgExplodeSm3.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
        imgExplodeSm4.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
    }, 250);
});