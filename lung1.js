import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/OBJLoader2.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
var parameters;
var test;
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.enablePan = false;
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('0x8E8E8E');



  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    //light.position.set(5, 10, 2);
    scene.add(light);
    //scene.add(light.target);
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('14.mtl', (mtlParseResult) => {
      const objLoader = new OBJLoader2();
      const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      objLoader.addMaterials(materials);

      //materials.Material.side = THREE.DoubleSide;
      
      objLoader.load('14.obj', (root) => {
           test = root;
           test.position.y = 11;
           test.scale.x = 2.5;
           test.scale.y = 2.5;
           test.scale.z = 2.5;
        scene.add(root);
      });
    });
  }
  

  function tampilmenu(){
      	var gui = new GUI();
  
  parameters = 
  {
    xScale: 0, yScale: 0, zScale: 0, xyzScale:2.5,
    xPos: 0, yPos: 0, zPos: 0,
    xRotate: 0, yRotate: 0, zRotate: 0,
    xyzRotate: 0

  }

 var comp1 = gui.add(parameters, 'yRotate').name('Rotasi').min(-10).max(10).step(0.02).listen();
 var comp2 = gui.add(parameters, 'xyzScale').name('Ukuran').min(1).max(3.4).step(0.02).listen();
    comp1.onChange(function(value){
       test.rotation.y = value; 
    });
    comp2.onChange(function(value){
        test.scale.x = value;
        test.scale.y = value;
        test.scale.z = value;
    });
  }  

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
    
    
  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();