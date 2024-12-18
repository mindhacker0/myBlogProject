import { useRef, useEffect, useState, useContext } from "react";
import URDFCustomManipulator from "./URDFCustomManipulator";
// import SliderListComponent from "./sliderListComponent";
import { degreesToRadians, openFile, radiansToDegrees } from '@/utils/index';
import {addFilesToUrdf, dataTransferToFiles} from "@/urdf/dragDrop";
import { GlobalContext } from "@/models/global";
if (!customElements.get('urdf-custom-manipulator')) {
    customElements.define('urdf-custom-manipulator', URDFCustomManipulator);
}

const URDFViewerComponent = props => {
    console.log("level",GlobalContext)
    const global = useContext(GlobalContext);
    
    const ref = useRef(null);
    const [joints, setJoints] = useState(null);

    const handleJointChange = (name, newValue) => {
        if (ref.current) {
            const _val = name === 'J4' ? newValue / 1000 : degreesToRadians(newValue);
            ref.current.setJointValue(name, _val);
        }
    };

    //websocket，joints states -> robot
    //反向的useEffect, robot -> joints states
    useEffect(() => {
        const viewer = ref.current;
        if (viewer) {
            console.log(viewer.robot)
            //viewer.setAttribute('urdf', props.urdf);
            //drag to add file folder
            document.addEventListener('dragover', e => e.preventDefault());
            document.addEventListener('dragenter', e => e.preventDefault());
            document.addEventListener('drop', e => {
                e.preventDefault();
                // convert the files
                // dataTransferToFiles(e.dataTransfer).then(files => {
                //     addFilesToUrdf(viewer,files);
                // });
            });

            viewer.setAttribute('up', props.up);
            viewer.setAttribute('no-auto-recenter', true)
        }
    }, [props.urdf, props.up]);

    // 角度变化监听回调
    const angleChange = (event) => {
        const viewer = ref.current;
        // setJoints(Object.values(viewer.robot.joints));
        // global.setJoints(viewer.robot.joints)
    };

    const urdfProcess = () => {
        const viewer = ref.current;
        const robot = viewer.robot;
        let scale = 6
        robot.scale.set(scale, scale, scale)
        // setJoints(Object.values(viewer.robot.joints));
        
        //global.setOriginJoints(viewer.robot.joints)
        console.log('urdfProcess', viewer.robot)
    };

    useEffect(() => {
        const viewer = ref.current;
        if (!viewer) {
            return () => {}
        }

        viewer.addEventListener('angle-change', angleChange);
        viewer.addEventListener('urdf-processed', urdfProcess);

        return () => {
            viewer.removeEventListener('angle-change', angleChange);
            viewer.removeEventListener('urdf-processed', urdfProcess);
        };
    }, []);

    useEffect(() => {
        console.log('robotInfo changed', global.robotInfo.jointPositions)
        for (let k in global.robotInfo.jointPositions) {
            handleJointChange(k, String(global.robotInfo.jointPositions[k]))
        }
        console.log("move",ref.current.scene)

        // todo: 要根据实际的末端位置，调用viewer的addPoint方法
        if (global.robotInfo.isMoving && ref.current) {
            let testValue = degreesToRadians(global.robotInfo.pose["x"]);
            // console.log("testValue", testValue);
            let radius = 5
            let x = global.robotInfo.pose["x"]
        
            ref.current.addPoint(
                global.robotInfo.pose["x"],
                global.robotInfo.pose["y"],    
                global.robotInfo.pose["z"],
                global.robotInfo.pose["roll"],
                global.robotInfo.pose["pitch"],
                global.robotInfo.pose["yaw"]);
        }
    }, [global.robotInfo]);
    //click to add file folder
    const openURDFFile = async()=>{
        const changeEvent = await openFile("*");
        const files = Object.create(null);
        const viewer = ref.current;
        const inputFiles = changeEvent.target.files;
        for(let f of inputFiles){
            files[f.webkitRelativePath]= f;
        }
        console.log(files)
        addFilesToUrdf(viewer,files);
    }
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            {/* <div style={{ backgroundColor: 'lightblue', whiteSpace: 'nowrap' }}>
                <SliderListComponent joints={joints} onJointChange={handleJointChange}></SliderListComponent>
            </div> */}
            <div onClick={openURDFFile}><span>open file</span></div>
            <div style={{ flex: 1}}>
                <urdf-custom-manipulator ref={ref} style={{ height: '100%' }}></urdf-custom-manipulator>
            </div>
        </div>
    );
};

export default URDFViewerComponent;
