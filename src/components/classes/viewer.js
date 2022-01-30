import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class Viewer {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
         this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
        this.grid = new THREE.GridHelper(1000, 1000);
        this.stats = new Stats();

        this.renderer.setSize(this.width, this.height);
        this.cube1 = this.createCubeWithTexture({
            xSize: 1,
            yZise: 1,
            zSize: 1,
            color: 0x00ff00,
            wireframe: false
        }, 'resources/images/wood.jpg');

        this.cube2 = this.createCubeWithTexture({
            xSize: 1,
            yZise: 1,
            zSize: 1,
            color: 0x00ff00,
            wireframe: false
        }, 'resources/images/wood.jpg');

        this.cube3 = this.createCubeWithTexture({
            xSize: 1,
            yZise: 1,
            zSize: 1,
            color: 0x00ff00,
            wireframe: false
        }, 'resources/images/wood.jpg');

        this.cube2.position.set(1, 0, 0);
        //this.cube3.position.set(1, 0, -1);

        this.camera.position.set(1,3,4);
        
        this.scene.add(this.grid)

        this.group = new THREE.Group();
        this.group.add(this.cube1);
        this.group.add(this.cube2);
        this.group.add(this.cube3);

        this.transformControls.attach(this.group);
        this.scene.add(this.transformControls);
        this.scene.add(this.group);

        this.transformControls.addEventListener('dragging-changed', (event) => {
            this.controls.enabled = !event.value;
        });

        document.body.appendChild(this.stats.dom);

        this.animate();

        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 't':
                    this.transformControls.setMode('translate');
                    break;
                case 'r':
                    this.transformControls.setMode('rotate');
                    break;
                case 's':
                    this.transformControls.setMode('scale');
                    break;
            }
        })
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        const render = () => {
            requestAnimationFrame(render);

            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.stats.update();
        }
        render();        
    }    

    createCube(data) {
        const geometry = new THREE.BoxGeometry(data.xSize, data.ySize, data.zSize);
        const material = new THREE.MeshBasicMaterial( { color: data.color, wireframe: data.wireframe } );
        
        return new THREE.Mesh(geometry, material);
    }

    createCubeWithTexture(data, texturePath) {
        const geometry = new THREE.BoxGeometry(data.xSize, data.ySize, data.zSize);
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshBasicMaterial( { map: loader.load(texturePath) } );
        
        return new THREE.Mesh(geometry, material);
    }
}