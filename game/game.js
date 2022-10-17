import * as THREE from 'three';

const scene = new THREE.Scene(); //create scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //create camera, fov and window width and height declared

const renderer = new THREE.WebGLRenderer();  //create render to render the scene
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); //generates the canvas

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
cube.position.set(0, -10, 0);


//CREATION OF COLLECTABLE
const collectablegeo = new THREE.CapsuleGeometry(1, 1, 4, 8);
const collectablemat = new THREE.MeshPhongMaterial({ color: 0x04f634, emissive: 0x1a7f2b, specular: 0x89e1a4, shininess: 40 }); // use of phong material to make material of object shiny.
const collectable = new THREE.Mesh(collectablegeo, collectablemat);

scene.add(collectable);
collectable.position.set(0, -5, 0);


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



camera.position.set(0, 0, 25);  //camera position (x, y, z)

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

  cylinder.rotation.y += 0.03;

  cylinder2.rotation.y += 0.03;




  renderer.render(scene, camera); //renders the scene

  //here is the function created which will later be declared to animate the 3d cube

};


animate(); // calling the animation function


// a function which will be called every time the window gets resized.
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);

init();
