import * as THREE from 'three';
import TWEEN from 'tween.js';
import Constants from './constants';
import CameraManager from './cameraManager';

export default class Record {
  constructor(id, crateId, pos, coverUrl = null) {
    this.id = id;
    this.crateId = crateId;
    this.pos = pos;
    this.state = 'out';
    this.coverUrl = coverUrl;
    this.recordXPos = -62 + (135 / Constants.recordsPerCrate) * pos;

    // Create record mesh
    const geometry = new THREE.BoxGeometry(100, 1.5, 100, 1, 1, 1);
    this.baseMaterial = new THREE.MeshLambertMaterial({
      color: Constants.sleeveColor,
    });
    this.mesh = new THREE.Mesh(geometry, this.baseMaterial);
    this.mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(50, 0, 0));
    this.mesh.position.set(this.recordXPos, Constants.scene.recordBaseY, 0);
    this.mesh.rotation.z = Math.PI / 2;
    this.mesh.recordId = id;
    this.absolutePosition = new THREE.Vector3();

    this.positionTween = new TWEEN.Tween();
    this.rotationTween = new TWEEN.Tween();

    this.setUnactive();
    this.pushRecord();

    // Load album cover if provided
    if (this.coverUrl) {
      this.applyCoverTexture(this.coverUrl);
    }
  }

  setActive() {
    this.active = true;
    this.mesh.visible = true;
  }

  setUnactive() {
    this.active = false;
    this.mesh.visible = false;
  }

  applyCoverTexture(imageUrl) {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      imageUrl,
      (texture) => {
        const { width, height } = texture.image;
        const aspect = width / height;

        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        texture.repeat.set(1, 1);
        texture.offset.set(0, 0);

        if (aspect > 1) {
          const visibleWidth = height / width;
          texture.repeat.x = visibleWidth;
          texture.offset.x = (1 - visibleWidth) / 2;
        } else if (aspect < 1) {
          const visibleHeight = width / height;
          texture.repeat.y = visibleHeight;
          texture.offset.y = (1 - visibleHeight) / 2;
        }

        texture.needsUpdate = true;

        const backTexture = texture.clone();
        backTexture.center.set(0.5, 0.5);
        backTexture.rotation = Math.PI;
        backTexture.needsUpdate = true;

        const coverFrontMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const coverBackMaterial = new THREE.MeshLambertMaterial({
          map: backTexture,
          side: THREE.DoubleSide,
        });

        this.mesh.material = [
          this.baseMaterial,      // right edge
          this.baseMaterial,      // left edge
          coverBackMaterial,      // top (faces viewer after flip)
          coverFrontMaterial,     // bottom (faces viewer by default)
          this.baseMaterial,      // front edge
          this.baseMaterial,      // back edge
        ];
      },
      undefined,
      (err) => {
        console.error('Texture load error:', err);
        console.error('CrateDigger: cover image failed to load', imageUrl);
        console.error('The host blocked the request (most of the CSV URLs require hotlinking permissions).');
      }
    );
  }

  showRecord() {
    this.positionTween.stop();
    this.rotationTween.stop();

    if (this.state !== 'shown') {
      this.state = 'shown';
      this.absolutePosition.setFromMatrixPosition(this.mesh.matrixWorld);

      this.positionTween = new TWEEN.Tween(this.mesh.position)
        .to({ y: Constants.scene.recordShownY }, Constants.scene.recordMoveTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();

      this.rotationTween = new TWEEN.Tween(this.mesh.rotation)
        .to({ z: Math.PI / 2 }, Constants.scene.recordMoveTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();

      CameraManager.focusRecord(this.recordXPos, this.absolutePosition);
    }
  }

  pushRecord() {
    if (this.state !== 'pushed') {
      this.state = 'pushed';
      this.positionTween.stop();
      this.rotationTween.stop();

      this.positionTween = new TWEEN.Tween(this.mesh.position)
        .to({ y: Constants.scene.recordBaseY }, Constants.scene.recordMoveTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();

      this.rotationTween = new TWEEN.Tween(this.mesh.rotation)
        .to({ z: Math.PI / 2 + Math.PI / 7 }, Constants.scene.recordMoveTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();
    }
  }

  pullRecord() {
    if (this.state !== 'pulled') {
      this.state = 'pulled';
      this.positionTween.stop();
      this.rotationTween.stop();

      this.positionTween = new TWEEN.Tween(this.mesh.position)
        .to({ y: Constants.scene.recordBaseY }, Constants.scene.recordMoveTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();

      this.rotationTween = new TWEEN.Tween(this.mesh.rotation)
        .to({ z: Math.PI / 2 - Math.PI / 7 }, Constants.scene.recordMoveTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();
    }
  }

  flipRecord(done) {
    this.state = 'flipped';
    this.positionTween.stop();
    this.rotationTween.stop();

    this.positionTween = new TWEEN.Tween(this.mesh.position)
      .to({ y: Constants.scene.recordFlippedY }, Constants.scene.infoOpenTime)
      .easing(TWEEN.Easing.Quartic.Out)
      .start();

    this.rotationTween = new TWEEN.Tween(this.mesh.rotation)
      .delay(Constants.scene.infoOpenTime / 4)
      .to({ x: 0, y: Math.PI, z: Math.PI / 2 }, Constants.scene.infoOpenTime)
      .easing(TWEEN.Easing.Quartic.Out)
      .start()
      .onComplete(done);

    CameraManager.zoomInRecord(this.recordXPos, this.absolutePosition);
  }

  flipBackRecord(done, noCameraTween) {
    if (this.state === 'flipped') {
      this.positionTween.stop();
      this.rotationTween.stop();

      this.positionTween = new TWEEN.Tween(this.mesh.position)
        .delay(Constants.scene.infoOpenTime / 2)
        .to({ y: Constants.scene.recordBaseY }, Constants.scene.infoOpenTime)
        .easing(TWEEN.Easing.Quartic.Out)
        .start();

      this.rotationTween = new TWEEN.Tween(this.mesh.rotation)
        .to({ y: 0 }, Constants.scene.infoOpenTime / 2)
        .easing(TWEEN.Easing.Quartic.Out)
        .start()
        .onComplete(done);

      if (!noCameraTween) {
        CameraManager.zoomOutRecord(this.recordXPos, this.absolutePosition);
      }
    }
  }
}
