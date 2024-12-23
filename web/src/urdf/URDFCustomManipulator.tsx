import URDFViewer from 'urdf-loader/src/urdf-viewer-element.js';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { degreesToRadians } from '@/utils';

class URDFCustomManipulator extends URDFViewer {    
    constructor(...args: ConstructorParameters<typeof URDFViewer>) {
        super(...args);

        this.loadMeshFunc = (path: string, manager: THREE.LoadingManager, done: (mesh: THREE.Mesh, err?: Error) => void) => {
            new STLLoader(manager).load(
                path,
                result => {
                    const material = new THREE.MeshPhongMaterial();
                    const mesh = new THREE.Mesh(result, material);
                    done(mesh);
                    console.log("loadMesh",mesh)
                },
                (event: ProgressEvent<EventTarget>) => {},
                err => {
                    const errorMesh = new THREE.Mesh();
                    done(errorMesh, err as Error);
                }
            );
        };

        // const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // 白色，强度为1
        // this.scene.add(ambientLight);

        // 添加额外的定向光
        const additionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        additionalLight.position.set(-4, 10, -1);
        this.scene.add(additionalLight);

        // 添加点光源
        const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
        pointLight.position.set(0, 5, 0);
        this.scene.add(pointLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemisphereLight.position.set(0, 1, 0);
        this.scene.add(hemisphereLight);


        this.maxPoints = 500; // 最大轨迹点数
        const points: THREE.Vector3[] = [];
        // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

        const lineMaterial = new THREE.LineDashedMaterial({
            color: 0xff00ff,
            dashSize: 1,
            gapSize: 1
        });
        

        const lineGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.maxPoints * 3); // 每个点3个坐标值
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.computeLineDistances(); // 计算距离，对于虚线材质必须调用

        this.scene.add(line);

        this.points = points;
        this.line = line;

        const axesHelper = new THREE.AxesHelper(6); // 参数是轴的长度
        this.scene.add(axesHelper);

        const size = 10; // 网格的大小
        const divisions = 10; // 网格中的细分格数
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);


        const endEffector = new THREE.Object3D();
        this.scene.add(endEffector);

        // 创建并添加 AxesHelper
        const endEffectorAxesHelper = new THREE.AxesHelper(1);  // 根据需要调整尺寸
        endEffector.add(endEffectorAxesHelper);

        this.endEffector = endEffector

        // this.camera.fov /= 0.5; // 将视角缩小，使得场景看起来放大
        // this.camera.updateProjectionMatrix(); // 更新相机的投影矩阵
        this.camera.position.z = -10;
        this.camera.position.y = -5;
    }

    addPoint(x: number, y: number, z: number, roll: number, pitch: number, yaw: number) {
        
        if (this.points.length >= this.maxPoints) {
            this.points.shift(); // 移除最老的点 
        }
        let scale = 167.5

        // x = y = z = pointIndex % 1000
        // pointIndex++

        console.log("addPoint: ", x, y, z, roll, pitch, yaw);

        this.points.push(new THREE.Vector3(-x / scale, -z / scale, -y / scale)); 
        this.updateLine(this.points, this.line)

        this.endEffector.position.set(-x / scale, -z / scale, -y / scale);
        this.endEffector.rotation.set(degreesToRadians(roll), degreesToRadians(pitch), degreesToRadians(yaw));
        this.renderer.render(this.scene, this.camera);
    }

    updateLine(points: THREE.Vector3[], line: THREE.Line) {
        if (!line) {
            return;
        }
        const positions = line.geometry.attributes.position.array;
    
        let i = 0;
        points.forEach(point => {
            positions[i++] = point.x;
            positions[i++] = point.y;
            positions[i++] = point.z;
        });

        line.geometry.attributes.position.needsUpdate = true;
        line.geometry.setDrawRange(0, points.length);
    }
}

export default URDFCustomManipulator;