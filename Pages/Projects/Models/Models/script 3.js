import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';


var canvas = document.getElementById('canvas3');

// Create a renderer and specify the canvas as the rendering target
var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);

// Set the size of the renderer
renderer.setSize(150, 150);
renderer.outputColorSpace = THREE.SRGBColorSpace; // optional with post-processing

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

//const controls = new OrbitControls( camera, renderer.domElement );


const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

camera.position.z = 0;
camera.position.y = 0;
camera.position.x = 1;

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xF0F0F0 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

const loader = new OBJLoader();

const color = 0x00F000;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const objLoader = new OBJLoader();
var myObj;

objLoader.load('../../../../3D/swor.obj', (root) => {
  myObj = root;
  root.scale.set(0.4,0.4,0.4)
  root.position.y = -0.4;
  scene.add(root);
});

var myObj2;

objLoader.load('../../../../3D/Staf.obj', (root) => {
  myObj2 = root;
  root.scale.set(0.2,0.2,0.2)
  root.position.z = 0.3;
  scene.add(root);
});

var myObj3;

objLoader.load('../../../../3D/Rod.obj', (root) => {
  myObj3 = root;
  root.scale.set(0.3,0.3,0.3)
  root.position.z = -0.6;
  root.position.x = -0.6;
  root.position.y = -0.7;
  scene.add(root);
});

camera.lookAt(scene.position);

var Rotate;
function animate() {
    requestAnimationFrame(animate);

    //controls.update();

    myObj.rotation.y += 0.005;
    myObj2.rotation.y += 0.005;
    myObj3.rotation.y += 0.005;

    renderer.render( scene, camera );
}

animate();