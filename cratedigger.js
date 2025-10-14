// cratedigger.js – Fixed version for GitHub Pages
// Ensures album cover textures fill the record face completely.

class Cratedigger {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.records = [];
        this.selectedRecord = -1;
        this.loadedRecords = 0;
        this.infoPanelState = 'closed';
        this.doRender = true;

        this.config = {
            debug: false,
            nbCrates: 3,
            recordsPerCrate: 16,
            backgroundColor: 0x1a1a1a,
            lightIntensity: 1.0,
            elements: {
                rootContainer: null,
                canvasContainer: null,
                loadingContainer: null,
                infoContainer: null
            },
            onInfoPanelOpened: () => {},
            onInfoPanelClosed: () => {},
            onLoadingEnd: () => {}
        };

        this.mouse = { x: 0, y: 0 };
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }

    init(params) {
        if (params) Object.assign(this.config, params);

        if (!this.config.elements.rootContainer) {
            console.error("cratedigger.js - Init failed: missing root container element.");
            return;
        }

        this.calculateCanvasSize();
        this.initScene();
        this.bindEvents();
        this.animate();
    }

    calculateCanvasSize() {
        this.canvasWidth = this.config.elements.rootContainer.clientWidth;
        this.canvasHeight = this.config.elements.rootContainer.clientHeight;
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.config.backgroundColor);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.canvasWidth, this.canvasHeight);
        this.config.elements.canvasContainer.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvasWidth / this.canvasHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 100, 300);

        // Lighting setup
        const light = new THREE.PointLight(0xffd6a5, this.config.lightIntensity);
        light.position.set(300, 80, 0);
        this.scene.add(light);

        const ambient = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambient);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(1000, 1000);
        const groundMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        this.scene.add(ground);

        // Create records
        this.initRecords();
    }

    initRecords() {
        for (let i = 0; i < this.config.nbCrates * this.config.recordsPerCrate; i++) {
            this.createRecord(i);
        }
    }

    createRecord(id) {
        const record = new Record(id);
        this.scene.add(record.mesh);
        this.records.push(record);
    }

    loadRecords(recordsData, shuffle, done) {
        this.showLoading(() => {
            if (shuffle) recordsData = this.shuffle(recordsData);

            for (let i = 0; i < this.records.length && i < recordsData.length; i++) {
                this.records[i].data = recordsData[i];
                this.records[i].setActive();
                this.records[i].updateTexture(recordsData[i].cover);
            }

            this.loadedRecords = Math.min(this.records.length, recordsData.length);
            this.recordsDataList = recordsData;

            setTimeout(() => {
                this.createCrates();
                this.hideLoading(done);
                this.config.onLoadingEnd();
            }, 1000);
        });
    }

    selectRecord(id) {
        if (id < 0 || id >= this.loadedRecords) return;
        this.selectedRecord = id;
        this.updateRecordDisplay();
    }

    selectPrevRecord() {
        const prevId =
            this.selectedRecord <= 0
                ? this.loadedRecords - 1
                : this.selectedRecord - 1;
        this.selectRecord(prevId);
    }

    selectNextRecord() {
        const nextId =
            this.selectedRecord >= this.loadedRecords - 1
                ? 0
                : this.selectedRecord + 1;
        this.selectRecord(nextId);
    }

    updateRecordDisplay() {
        this.records.forEach((record, index) => {
            if (index === this.selectedRecord) {
                record.mesh.position.y = 50;
                record.mesh.scale.setScalar(1.2);
            } else {
                record.mesh.position.y = 40;
                record.mesh.scale.setScalar(1.0);
            }
        });
    }

    flipSelectedRecord() {
        if (this.records[this.selectedRecord]) {
            this.infoPanelState = "opened";
            this.fadeIn(this.config.elements.infoContainer);
            this.config.onInfoPanelOpened();
        }
    }

    flipBackSelectedRecord() {
        if (this.infoPanelState === "opened") {
            this.fadeOut(this.config.elements.infoContainer);
            this.infoPanelState = "closed";
            this.config.onInfoPanelClosed();
        }
    }

    showLoading(done) {
        this.fadeIn(this.config.elements.loadingContainer);
        setTimeout(done || (() => {}), 1000);
    }

    hideLoading(done) {
        this.fadeOut(this.config.elements.loadingContainer);
        setTimeout(done || (() => {}), 1000);
    }

    fadeIn(element) {
        element.style.display = "block";
        setTimeout(() => (element.style.opacity = 1), 15);
    }

    fadeOut(element) {
        element.style.opacity = 0;
        setTimeout(() => (element.style.display = "none"), 300);
    }

    bindEvents() {
        this.config.elements.rootContainer.addEventListener("wheel", (e) => {
            if (e.deltaY < 0) this.selectPrevRecord();
            else this.selectNextRecord();
            e.preventDefault();
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.selectPrevRecord();
            else if (e.key === "ArrowRight") this.selectNextRecord();
            else if (e.key === "Enter" || e.key === " ") this.flipSelectedRecord();
            else if (e.key === "Escape") this.flipBackSelectedRecord();
        });
    }

    animate() {
        if (this.doRender) {
            requestAnimationFrame(this.animate.bind(this));
            this.renderer.render(this.scene, this.camera);
        }
    }

    shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    getSelectedRecord() {
        return this.records[this.selectedRecord];
    }

    createCrates() {
        const crateCount = Math.ceil(
            this.loadedRecords / (this.config.recordsPerCrate * 2)
        );
        const crateWidth = 800;
        const crateDepth = 240;
        const crateHeight = 50;
        const wallThickness = 10;
        const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });

        for (let i = 0; i < crateCount; i++) {
            const centerZ = 2 * i * 100 - 250;

            const bottomGeom = new THREE.BoxGeometry(crateWidth, wallThickness, crateDepth);
            const bottomMesh = new THREE.Mesh(bottomGeom, woodMaterial);
            bottomMesh.position.set(0, -wallThickness / 2, centerZ);

            const sideGeom = new THREE.BoxGeometry(wallThickness, crateHeight, crateDepth);
            const sideLeftMesh = new THREE.Mesh(sideGeom, woodMaterial);
            sideLeftMesh.position.set(
                -crateWidth / 2 - wallThickness / 2,
                crateHeight / 2,
                centerZ
            );
            const sideRightMesh = new THREE.Mesh(sideGeom, woodMaterial);
            sideRightMesh.position.set(
                crateWidth / 2 + wallThickness / 2,
                crateHeight / 2,
                centerZ
            );

            const backGeom = new THREE.BoxGeometry(
                crateWidth + wallThickness * 2,
                crateHeight,
                wallThickness
            );
            const backMesh = new THREE.Mesh(backGeom, woodMaterial);
            backMesh.position.set(0, crateHeight / 2, centerZ - crateDepth / 2 - wallThickness / 2);

            this.scene.add(bottomMesh, sideLeftMesh, sideRightMesh, backMesh);
        }
    }
}

class Record {
    constructor(id) {
        this.id = id;
        this.data = null;
        this.active = false;
        this.mesh = this.createMesh();

        // Grid positioning
        const col = id % 8;
        const row = Math.floor(id / 8);
        this.mesh.position.x = (col - 3.5) * 100;
        this.mesh.position.z = (row - 3) * 100;
        this.mesh.position.y = 40;
        this.mesh.rotation.x = -0.05 - Math.random() * 0.05;
    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(80, 80, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x333333,
            specular: 0x555555,
            shininess: 50,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.visible = false;
        return mesh;
    }

    setActive() {
        this.active = true;
        this.mesh.visible = true;
    }

    // ✅ Fixed: image fills entire record face
    updateTexture(imageUrl) {
        if (!imageUrl) return;

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin("Anonymous");
        loader.load(
            imageUrl,
            (texture) => {
                const img = texture.image;
                const w = img.width;
                const h = img.height;
                const aspect = w / h;

                // Reset defaults
                texture.repeat.set(1, 1);
                texture.offset.set(0, 0);

                if (aspect > 1) {
                    // Landscape: crop left/right
                    const visibleWidth = h / w;
                    texture.repeat.x = visibleWidth;
                    texture.offset.x = (1 - visibleWidth) / 2;
                } else if (aspect < 1) {
                    // Portrait: crop top/bottom
                    const visibleHeight = w / h;
                    texture.repeat.y = visibleHeight;
                    texture.offset.y = (1 - visibleHeight) / 2;
                }

                texture.needsUpdate = true;
                this.mesh.material.map = texture;
                this.mesh.material.needsUpdate = true;
            },
            undefined,
            (error) => console.error("Texture load error:", error)
        );
    }
}

window.Cratedigger = Cratedigger;
     
