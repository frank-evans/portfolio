import { Sound } from './audio.js';
import { openModal } from './modal.js';
import { CSS2DRenderer, CSS2DObject } from './CSS2DRenderer.js';
/* import explosion from '../static/explosion.gif'; */
import './three.min.js';
import './GLTFLoader.js';
import './yuka.js';
import './modal.js';

/* initialize audio */
const fxLaser = new Sound("./sounds/laser-retro.mp3", 5, 0.13);
const fxExplode = new Sound("./sounds/explosion-low.mp3", 1, 0.3);
// separate sound effects for small rocks to avoid clipping
const fxHit = new Sound("./sounds/explosion-low.mp3", 1, 0.15);
const fxHit2 = new Sound("./sounds/explosion-low.mp3", 1, 0.15);

let modal1 = document.getElementById('modal1');
let modal2 = document.getElementById('modal2');
let modal3 = document.getElementById('modal3');

let model, rock, card, app, rockSmall, rockSmall2;

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

// CSS2DRenderer initialization ************************************************
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
card.position.set(-10, 7, -5);

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
app.position.set(0, 10, -5);

// asteroid texture loading
// geometry initialization 
const Geometry = new THREE.PlaneGeometry(8, 8);
const rockTexture = textureLoader.load("./static/asteroid2.png");
rockTexture.rotation = 0.3;
const rockMaterial = new THREE.MeshStandardMaterial({
    //size: 2.0,
    color: 0xdddddd,
    map: rockTexture,
    transparent: true,
});
rock = new THREE.Mesh(Geometry, rockMaterial);
scene.add(rock);
rock.position.set(12, 7, -5);

// SMALL ROCK TEST ************************************************************************ 
const Geometry2 = new THREE.PlaneGeometry(3, 3);
const rockMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    map: rockTexture,
    transparent: true,
});
rockSmall = new THREE.Mesh(Geometry2, rockMaterial2);
scene.add(rockSmall);
rockSmall.position.set(12, -5, -5);

// SMALL ROCK 2 TEST ************************************************************************
const rockMaterial3 = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    map: rockTexture,
    transparent: true,
});
rockSmall2 = new THREE.Mesh(Geometry2, rockMaterial3);
scene.add(rockSmall2);
rockSmall2.position.set(-12, -5, -5);

// CSS2DRenderer initialization for explosion gif (html)
const img = document.createElement('img');
img.src = './static/explosion.gif';
const div = document.createElement('div');
div.appendChild(img);
const divContainer = new CSS2DObject(div);
scene.add(divContainer);
divContainer.position.set(0, 10, -5);
// Set initial size
const widthPercentage = 50; // 45% of window width
/* img.style.height = (window.innerHeight * heightPercentage / 100) + 'px'; */
img.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
/* img.style.height = (window.innerHeight * (window.innerWidth * 0.56) / 100) + 'px'; */
img.style.display = 'none';
/* img.style.display = 'initial'; */

// CSS2DRenderer initialization for explosionSMALL gif (html) 
const img2 = document.createElement('img');
img2.src = './static/lowExplosionShort.gif';
const div2 = document.createElement('div');
div2.appendChild(img2);
const divContainer2 = new CSS2DObject(div2);
scene.add(divContainer2);
divContainer2.position.set(0, 10, -5);
// Set initial size
const widthPercentage2 = 45; // 45% of window width
img2.style.width = (window.innerWidth * widthPercentage2 / 100) + 'px';
img2.style.display = 'none';
img2.style.opacity = 1.0;

// force different gif loop                          *******************************************
const img3 = document.createElement('img');
img3.src = './static/lowExplosionShort.gif?'+ Math.random();
const div3 = document.createElement('div');
div3.appendChild(img3);
const divContainer3 = new CSS2DObject(div3);
scene.add(divContainer3);
divContainer3.position.set(0, 10, -5);
img3.style.width = (window.innerWidth * widthPercentage2 / 100) + 'px';
img3.style.display = 'none';
img3.style.opacity = 1.0;

// Yuka AI vehicle initialization 
const vehicle = new YUKA.Vehicle();

vehicle.scale.set(0.60, 0.60, 0.60);
vehicle.position.set(-11, 20, 0);

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
    if (modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1 && !(img.style.display == 'initial')) {
        raycaster.setFromCamera(mousePosition, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        for(let i = 0; i < intersects.length; i++) {
            if(intersects[i].object.name === 'plane') 
                target.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
                laserClick = true;
        }
    }
});

function fade(r) {
    if (r.style.opacity == 1.0) {
        r.style.opacity = 0.9;
    } 
}

function respawn(r, y) {
    if (modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1) {
        setTimeout (() => {
            scene.add(r);
            r.material.opacity = 0.0;
            r.position.y = y;
        }, 7.0 * 1000);
    } else {
        setTimeout (() => {  
            respawn(r, y);
        }, 1000);
    }
}

// bullet array
let bullets = [];

// limit shots per frames 
let canShoot = 0;

// sync with AI time (YUKA)
const time = new YUKA.Time();

let m = new THREE.Matrix4();

let z = 1;

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
    rockSmall.rotation.z += Math.sin(t / 3600) * 0.01;
    rockSmall.position.z += Math.sin(t / 400) * 0.0008;
    rockSmall.position.x -= Math.sin(t / 6400) * 0.01;
    rockSmall.position.y += Math.sin(t / 5600) * 0.01;
    
    // rockSMALL2 default animation
    rockSmall2.rotation.z -= Math.sin(t / 4800) * 0.01;
    rockSmall2.position.z += Math.sin(t / 400) * 0.0008;
    rockSmall2.position.x += Math.sin(t / 7200) * 0.01;
    rockSmall2.position.y -= Math.sin(t / 6800) * 0.01;

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
        if (bullets[index].position.x > (card.position.x - 1.0) && bullets[index].position.x < (card.position.x + 3.5) && !(img.style.display == 'initial') && card.material.opacity >= 1.0){
            if (bullets[index].position.y > (card.position.y - 3.8) && bullets[index].position.y < (card.position.y + 2.3) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                img.src = img.src;
                img.style.display = 'initial';
                /* divContainer.position.set(-11, 7, -5); */
                divContainer.position.set(card.position.x, card.position.y - 0.5, -5);
                fxExplode.play();

                setTimeout(() => {
                    openModal(modal1);
                }, 1.0 * 1000); 

                setTimeout(() => {
                    scene.remove(card);
                    card.position.y = 300;
                }, 2.0 * 1000); 

                setTimeout(() => {
                    img.style.display = 'none';
                    divContainer.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    /* scene.add(card);
                    card.material.opacity = 0.0;
                    card.position.y = 7; */
                    respawn(card, 7);
                }, 4.0 * 1000); 
            }    
        } 
        // app hitbox
        if (bullets[index].position.x > (app.position.x - 1.6) && bullets[index].position.x < (app.position.x + 2) && !(img.style.display == 'initial') && app.material.opacity >= 1.0){
            if (bullets[index].position.y > (app.position.y - 3.8) && bullets[index].position.y < (app.position.y + 1.5) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                img.src = img.src;
                img.style.display = 'initial';
                /* divContainer.position.set(0, 10, -5); */
                divContainer.position.set(app.position.x, app.position.y, -5);
                fxExplode.play();

                setTimeout(() => {
                    openModal(modal2);
                }, 1.0 * 1000); 

                setTimeout(() => {
                    scene.remove(app);
                    app.position.y = 300;
                }, 2.0 * 1000); 

                setTimeout(() => {
                    img.style.display = 'none';
                    divContainer.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(app, 10);
                }, 4.0 * 1000);
            }    
        } 
        // rock hitbox
        if (bullets[index].position.x > (rock.position.x - 5.0) && bullets[index].position.x < (rock.position.x + 0.0) && !(img.style.display == 'initial') && rock.material.opacity >= 1.0){
            if (bullets[index].position.y > (rock.position.y - 2.5) && bullets[index].position.y < (rock.position.y + 3.0) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                img.src = img.src;
                img.style.display = 'initial';
                /* divContainer.position.set(11, 8, -5); */
                divContainer.position.set(rock.position.x, rock.position.y, -5);
                fxExplode.play();

                setTimeout(() => {
                    openModal(modal3);
                }, 1.0 * 1000); 

                setTimeout(() => {
                    scene.remove(rock);
                    rock.position.y = 300;
                }, 2.0 * 1000); 

                setTimeout(() => {
                    img.style.display = 'none';
                    divContainer.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rock, 8);
                }, 4.0 * 1000);
            }    
        } 
        // rockSMALL hitbox **************************************************** 
        if (bullets[index].position.x > (rockSmall.position.x - 3.0) && bullets[index].position.x < (rockSmall.position.x + 0.0) && rockSmall.material.opacity >= 1.0  && !(img2.style.display == 'initial')){
            if (bullets[index].position.y > (rockSmall.position.y - 0.5) && bullets[index].position.y < (rockSmall.position.y + 2.2) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                img2.src = img2.src;
                img2.style.display = 'initial';
                /* divContainer2.position.set(11.5, -4.5, -5); */
                divContainer2.position.set(rockSmall.position.x, rockSmall.position.y, -5);
                fxHit.play();

                setTimeout(() => {
                    scene.remove(rockSmall);
                    rockSmall.position.y = 300;
                }, 0.3 * 1000); 

                setTimeout(() => {
                    fade(img2);
                }, 2.0 * 1000);

                setTimeout(() => {
                    img2.style.display = 'none';
                    img2.style.opacity = 1.0;
                    divContainer2.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rockSmall, -5);
                }, 4.0 * 1000);
            }    
        } 
        // rockSMALL2 hitbox **************************************************** 
        if (bullets[index].position.x > (rockSmall2.position.x - 0.3) && bullets[index].position.x < (rockSmall2.position.x + 2.5) && rockSmall2.material.opacity >= 1.0  && !(img3.style.display == 'initial')){
            if (bullets[index].position.y > (rockSmall2.position.y - 0.5) && bullets[index].position.y < (rockSmall2.position.y + 2.2) && modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1){
                img3.src = img3.src;
                img3.style.display = 'initial';
                /* divContainer3.position.set(-11.5, -4.5, -5); */
                divContainer3.position.set(rockSmall2.position.x, rockSmall2.position.y, -5);
                fxHit2.play();

                setTimeout(() => {
                    scene.remove(rockSmall2);
                    rockSmall2.position.y = 300;
                }, 0.3 * 1000); 

                setTimeout(() => {
                    fade(img3);
                }, 2.0 * 1000);

                setTimeout(() => {
                    img3.style.display = 'none';
                    img3.style.opacity = 1.0;
                    divContainer3.position.set(0, 100, -5);
                }, 3.5 * 1000);

                setTimeout(() => {
                    respawn(rockSmall2, -5);
                }, 4.0 * 1000);
            }    
        } 
    }

    if (modal1.classList.length == 1 && modal2.classList.length == 1 && modal3.classList.length == 1) {
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
        if (img2.style.opacity < 1.0) {
            img2.style.opacity -= 0.01;
        }
        if (img3.style.opacity < 1.0) {
            img3.style.opacity -= 0.01;
        }
    }

    // timer for laser intervals
    if(canShoot > 0) canShoot -= 1;

    entityManager.update(delta);
    
    labelRenderer.render(scene, camera);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    /* camera.aspect = window.innerWidth / window.innerHeight; */
    camera.aspect = window.innerWidth / (window.innerWidth * 0.56);
    camera.updateProjectionMatrix();
   /*  renderer.setSize(window.innerWidth, window.innerHeight); */
    renderer.setSize(window.innerWidth, (window.innerWidth * 0.56));
    /* labelRenderer.setSize(window.innerWidth, window.innerHeight); */
    labelRenderer.setSize(window.innerWidth, (window.innerWidth * 0.56));

    // CSS2DRenderer resize (explosion gif)
    /* img.style.height = (window.innerHeight * heightPercentage / 100) + 'px'; */
    img.style.width = (window.innerWidth * widthPercentage / 100) + 'px';
});