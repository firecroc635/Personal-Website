import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(150, 150);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
);

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper);

camera.position.z = 4;
camera.position.y = 0;

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0xF0F0F0})
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);


renderer.render(scene, camera);