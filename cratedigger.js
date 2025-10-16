import * as THREE from "https://unpkg.com/three@0.155.0/build/three.module.js";
import TWEEN from "https://unpkg.com/@tweenjs/tween.js@18.6.4/dist/tween.esm.js";
import Stats from "https://unpkg.com/stats-js@1.0.1/build/stats.min.js";
import * as dat from "https://unpkg.com/dat.gui@0.7.9/build/dat.gui.module.js";
import Record from './record.js';
import CameraManager from './cameraManager.js';
import Constants from './constants.js';

// VARIABLES
const exports = {};

// Three.js objects
let stats, scene, camera, renderer, light, leftLight, rightLight, composer, FXAA, dof, gui;
let depthTarget, depthShader, depthUniforms, depthMaterial;

// Data containers
let crates = [];
let records = [];
let recordsDataList = [];

// Containers
let rootContainer;
let cratesContainer;

// State variables
let canvasWidth, canvasHeight, dpr;
let scrollRecordsTimeout;
let infoPanelState = 'closed';
let doRender = true;
let selectedRecord = -1;
let shownRecord = -1;
let loadedRecords = 0;
let mouse = { x: 0, y: 0 };
let mouseDownPos = { x: 0, y: 0 };
let targetCameraPos = { x: 0, y: 0 };

// Materials
let woodMaterial;

// -----------------------------------------------------------
// CORE METHODS
// -----------------------------------------------------------

function animate() {
  if (doRender) {
    requestAnimationFrame(animate);
    render();
    if (Constants.debug && stats) stats.update();
  }
}

function render() {
  TWEEN.update();
  updateShownRecord();

  if (Constants.cameraMouseMove) {
    targetCameraPos.x = (mouse.x / canvasWidth - 0.5) * 0.25;
    targetCameraPos.y = (mouse.y / canvasWidth - 0.5) * 0.25;
    rootContainer.rotation.y += Constants.scene.cameraMouseMoveSpeedY * (targetCameraPos.x - rootContainer.rotation.y);
    rootContainer.rotation.z += Constants.scene.cameraMouseMoveSpeedZ * (targetCameraPos.y - rootContainer.rotation.z);
  }

  CameraManager.lookAtTarget();

  if (Constants.postprocessing) {
    scene.overrideMaterial = depthMaterial;
    renderer.render(scene, camera, depthTarget);
    scene.overrideMaterial = null;
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

// -----------------------------------------------------------
// RECORD MANAGEMENT
// -----------------------------------------------------------

function unloadRecords() {
  for (let i = 0; i < records.length; i++) {
    records[i].data = null;
    records[i].setUnactive();
  }
  loadedRecords = 0;
  recordsDataList = [];
}

function loadRecords(recordsData, shuffleBeforeLoading, done) {
  resetShownRecord(true);
  showLoading(() => {
    if (loadedRecords > 0) unloadRecords();
    if (shuffleBeforeLoading) recordsData = shuffle(recordsData);

    for (let i = 0; i < records.length && i < recordsData.length; i++) {
      records[i].data = recordsData[i];
      records[i].setActive();
      records[i].mesh.material.materials = getRecordMaterial(recordsData[i].cover, recordsData[i].hasSleeve);
    }

    loadedRecords = Math.min(records.length, recordsData.length);
    recordsDataList = recordsData;

    setTimeout(() => {
      hideLoading(done);
      Constants.onLoadingEnd();
    }, 1500);
  });
}

// -----------------------------------------------------------
// RECORD MATERIAL FIX — CROPPED COVER FILL
// -----------------------------------------------------------

function getRecordMaterial(src, hasSleeve) {
  const img = new window.Image();
  const size = 400;
  const mapCanvas = document.createElement('canvas');
  const texture = new THREE.Texture(mapCanvas);
  let sleeve, sleeveMaterial, materials;

  img.crossOrigin = 'Anonymous';
  img.src = src || '';

  mapCanvas.width = mapCanvas.height = size;
  texture.minFilter = THREE.LinearFilter;

  img.onload = function () {
    const ctx = mapCanvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.translate(size / 2, size / 2);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-size / 2, -size / 2);

    // Aspect-ratio crop to fill
    const iw = img.width;
    const ih = img.height;
    const ir = iw / ih;
    const cw = size;
    const ch = size;
    const cr = cw / ch;
    let sx, sy, sw, sh;

    if (ir > cr) {
      sw = ih * cr;
      sh = ih;
      sx = (iw - sw) / 2;
      sy = 0;
    } else {
      sw = iw;
      sh = iw / cr;
      sx = 0;
      sy = (ih - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);

    if (hasSleeve) {
      sleeve = new window.Image();
      sleeve.src = Constants.sleeveMaskTexture;
      sleeve.onload = function () {
        ctx.drawImage(sleeve, 0, 0, cw, ch);
        texture.needsUpdate = true;
      };
    } else {
      texture.needsUpdate = true;
    }
  };

  sleeveMaterial = new THREE.MeshLambertMaterial({ color: Constants.sleeveColor });

  materials = [
    sleeveMaterial, // right
    sleeveMaterial, // left
    sleeveMaterial, // top
    new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture }), // front
    sleeveMaterial, // back
    sleeveMaterial, // bottom
  ];

  return materials;
}

// -----------------------------------------------------------
// RECORD NAVIGATION
// -----------------------------------------------------------

function selectRecord(id) {
  if (infoPanelState === 'opened') {
    flipBackSelectedRecord();
  } else if (infoPanelState !== 'opening' && infoPanelState !== 'closing') {
    if (id < 0) resetShownRecord();
    else if (id > loadedRecords) selectedRecord = loadedRecords - 1;
    else selectedRecord = id;
  }
}

function flipSelectedRecord() {
  if (records[selectedRecord]) {
    infoPanelState = 'opening';
    records[selectedRecord].flipRecord(() => (infoPanelState = 'opened'));
    Constants.onInfoPanelOpened();
    setTimeout(() => fadeIn(Constants.elements.infoContainer), 300);
  }
}

function flipBackSelectedRecord(force) {
  if (infoPanelState === 'opened') {
    fadeOut(Constants.elements.infoContainer);
    infoPanelState = 'closing';
    records[selectedRecord].flipBackRecord(() => {
      infoPanelState = 'closed';
      Constants.onInfoPanelClosed();
    }, force);
  }
}

// -----------------------------------------------------------
// EVENT FIXES (TOUCH & SCROLL)
// -----------------------------------------------------------

function onTouchMoveEvent(e) {
  let mPosx = 0, mPosy = 0, ePosx = 0, ePosy = 0;
  const event = e || window.event;
  let _this = this;

  if (event.changedTouches && event.changedTouches[0]) {
    if (event.changedTouches[0].pageX || event.changedTouches[0].pageY) {
      mPosx = event.changedTouches[0].pageX;
      mPosy = event.changedTouches[0].pageY;
    } else if (event.changedTouches[0].clientX || event.changedTouches[0].clientY) {
      mPosx = event.changedTouches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      mPosy = event.changedTouches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
  }

  if (_this && _this.offsetParent) {
    do {
      ePosx += _this.offsetLeft;
      ePosy += _this.offsetTop;
    } while ((_this = _this.offsetParent));
  }

  mouse.x = mPosx - ePosx;
  mouse.y = mPosy - ePosy;
}

// -----------------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------------

function initScene() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(canvasWidth, canvasHeight);
  Constants.elements.canvasContainer.appendChild(renderer.domElement);
  renderer.domElement.id = 'context';
  renderer.setClearColor(Constants.backgroundColor, 1);

  CameraManager.init(canvasWidth / canvasHeight);
  camera = CameraManager.getCamera();

  const loader = new THREE.TextureLoader();
  const woodTexture = loader.load(Constants.crateTexture);
  woodTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  woodMaterial = new THREE.MeshLambertMaterial({ map: woodTexture });

  rootContainer = new THREE.Object3D();
  cratesContainer = new THREE.Object3D();
  scene.add(rootContainer);
  rootContainer.add(cratesContainer);

  initCrates();
  initRecords();

  light = new THREE.PointLight(0xffffff, Constants.lightIntensity * 1.1);
  light.position.set(300, 80, 0);
  scene.add(light);

  leftLight = new THREE.PointLight(0xffffff, Constants.lightIntensity * 0.6);
  leftLight.position.set(-100, 300, 1000);
  scene.add(leftLight);

  rightLight = new THREE.PointLight(0xffffff, Constants.lightIntensity * 0.6);
  rightLight.position.set(-100, 300, -1000);
  scene.add(rightLight);

  bindEvents();
  resetShownRecord();
  animate();
}

// -----------------------------------------------------------
// UTILS
// -----------------------------------------------------------

function shuffle(array) {
  let counter = array.length, temp, index;
  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function showLoading(done) {
  fadeIn(Constants.elements.loadingContainer);
  setTimeout(done, 1000);
}

function hideLoading(done) {
  fadeOut(Constants.elements.loadingContainer);
  setTimeout(done, 1000);
}

// -----------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------

exports.init = function init(params) {
  Constants.extend(params);
  dpr = window.devicePixelRatio || 1;
  if (!Constants.elements.rootContainer || !Constants.elements.canvasContainer) return;
  calculateCanvasSize();
  initScene();
};

exports.loadRecords = loadRecords;
exports.unloadRecords = unloadRecords;
exports.flipSelectedRecord = flipSelectedRecord;
exports.flipBackSelectedRecord = flipBackSelectedRecord;
exports.selectRecord = selectRecord;
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;

export default exports;
