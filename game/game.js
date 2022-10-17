import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();  //create render to render the scene
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); //generates the canvas

const scene = new THREE.Scene(); //create scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //create camera, fov and window width and height declared


const controls = new OrbitControls(camera, renderer.domElement); //addition of orbit controls
camera.position.set(0, 5, 25);  //sets camera position
controls.update();



//Addition of event listener to listen for pressed keys
document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);

//hold the information on whether keys are pressed
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//Listen for the keydown/keyup events and act accordingly
function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true;
  } else if (event.keyCode === 37) {
    leftPressed = true;
  }
  if (event.keyCode === 40) {
    downPressed = true;
  } else if (event.keyCode === 38) {
    upPressed = true;
  }
}
//REMINDER FOR THE KEYCODES
const KeyboardHelper = { left: 37, up: 38, right: 39, down: 40 };




//!Importing external model!
const loader = new GLTFLoader();
// Loading a GLTF resource
loader.load(
  // resource URL
  'https://mymainpage.kieronhall.repl.co/resources/3dmodels/lowpolytruck/scene.gltf ',
  // called when the resource is loaded
  function(gltf) {

    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
    gltf.scene.scale.set(0.02, 0.02, 0.02) // scale here
    gltf.scene.position.set(0, -9, 0);
  },
  // called while loading is progressing
  function(xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% loaded');

  },
  // called when loading has errors
  function(error) {

    console.log('Error loading Car');

  }
);



//CREATION OF PLANE
const planegeo = new THREE.PlaneGeometry(50, 75);
const planemat = new THREE.MeshBasicMaterial({ color: 0xb4b4b4, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planegeo, planemat);
scene.add(plane);
plane.position.set(0, -10, -20)
plane.rotation.x = Math.PI / 2;


//CREATION OF CUBE
const cubegeo = new THREE.BoxGeometry(5, 5, 5, 5); //creates box geometry
const cubemat = new THREE.MeshBasicMaterial({ color: 0x0000ff });  //material of game object and css ex code used to change colour
const cube = new THREE.Mesh(cubegeo, cubemat); //creates mesh

scene.add(cube); //adding cube mesh to the scene
cube.position.set(0, -10, -15);




//CREATION OF COLLECTABLE
const collectablegeo = new THREE.CapsuleGeometry(1, 1, 4, 8);
const collectablemat = new THREE.MeshPhongMaterial({ color: 0x04f634, emissive: 0x1a7f2b, specular: 0x89e1a4, shininess: 40 }); // use of phong material to make material of object shiny.
const collectable = new THREE.Mesh(collectablegeo, collectablemat);

scene.add(collectable);
collectable.position.set(6, -5, -6);


//CREATION OF CYLINDER
const cylindergeo = new THREE.CylinderGeometry(5, 5, 20, 8);
const cylindermat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const cylinder = new THREE.Mesh(cylindergeo, cylindermat);

scene.add(cylinder);
cylinder.position.set(18, 0, 0);


//CREATION OF CYLINDER 2
const cylinder2geo = new THREE.CylinderGeometry(5, 5, 20, 8);
const cylinder2mat = new THREE.MeshBasicMaterial({ color: 0xffa500, wireframe: true });
const cylinder2 = new THREE.Mesh(cylinder2geo, cylinder2mat);

scene.add(cylinder2);
cylinder2.position.set(-18, 0, 0);


//Addition of Light
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 0);
scene.add(dirLight);





//cube.rotation.y = Math.PI/4; // set the rotation of the cube


const animate = function() { //animation loop which causes the renderer to draw scene every time screen is refreshed


  requestAnimationFrame(animate);

  cube.rotation.x += 0.03;
  cube.rotation.y += 0.03;
  if (cube.position.y < 10) { //cube moving across y axis until 10
    cube.position.y += 0.1;
  }

  collectable.rotation.x += 0.02;
  collectable.rotation.y += 0.03;

  cylinder.rotation.y += 0.02;

  cylinder2.rotation.y += 0.02;



  controls.update
  renderer.render(scene, camera); //renders the scene

  //here is the function created which will later be declared to animate the 3d cube

};


animate(); // calling the animation function


// a function which will be called every time the window gets resized. !NOT WORKING!
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);

init();
