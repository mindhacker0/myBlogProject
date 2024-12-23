declare module 'urdf-loader/src/urdf-viewer-element.js' {
    export default class URDFViewer extends HTMLElement {
        scene: THREE.Scene;
        renderer: THREE.WebGLRenderer;
        camera: THREE.PerspectiveCamera;
        robot: URDFRobot;
        maxPoints: number;
        loadMeshFunc: URDFLoader.MeshLoadFunc;
        points: THREE.Vector3[];
        line: THREE.Line;
        endEffector: THREE.Object3D;
        urdf: string;
        package: string;
        urlModifierFunc: (url: string) => string;
        setJointValue(name: string, value: number): void;
        setAttribute(name: string, value: any): void;
    }
} 