import { useRef, useEffect, FC, useContext } from "react";
import { degreesToRadians } from '@/utils/index';
import { RobotInfo } from "@/types/robot";
import URDFCustomManipulator from "./URDFCustomManipulator";
import { EditorContext } from "@/components/LowCodeEditor/editorContext";

customElements.define('urdf-custom-manipulator', URDFCustomManipulator);

type Coordinate = 'X' | 'Y' | 'Z'
type Sign = '+' | '-';
export type Up = `${Sign}${Coordinate}`
interface URDFViewerProps {
    style?:React.CSSProperties;
    data?:RobotInfo;
    up?:Up;
}

const URDFViewerComponent:FC<URDFViewerProps> = props => {
    const ref = useRef<URDFCustomManipulator|null>(null);
    const {setOriginJoints} = useContext(EditorContext);
    const handleJointChange = (name: string, newValue: number) => {
        if (ref.current) {
            const _val = name === 'J4' ? newValue / 1000 : degreesToRadians(newValue);
            ref.current.setJointValue(name, _val);
        }
    };
    // 角度变化监听回调
    const angleChange:EventListener = (event) => {
        const viewer = ref.current;
    };

    const urdfProcess = () => {
        const viewer = ref.current;
        if(!viewer) return;
        const robot = viewer.robot;
        let scale = 6
        robot.scale.set(scale, scale, scale)
        setOriginJoints(viewer.robot.joints)
        console.log('urdfProcess', viewer.robot)
    };
    const {setUrdfInstance} = useContext(EditorContext);
    useEffect(() => {
        const viewer = ref.current;
        if (!viewer) {
            return () => {}
        }
        setUrdfInstance(viewer);
        viewer.addEventListener('angle-change', angleChange);
        viewer.addEventListener('urdf-processed', urdfProcess);

        return () => {
            viewer.removeEventListener('angle-change', angleChange);
            viewer.removeEventListener('urdf-processed', urdfProcess);
        };
    }, []);

    useEffect(() => {
        if(props.data){
            const {jointPositions,pose,isMoving} = props.data;
            for (let k in jointPositions) {
                handleJointChange(k, jointPositions[k])
            }
            // todo: 要根据实际的末端位置，调用viewer的addPoint方法
            if (isMoving && ref.current) {
                ref.current.addPoint(
                    Number(pose["x"]),
                    Number(pose["y"]), 
                    Number(pose["z"]),
                    Number(pose["roll"]),
                    Number(pose["pitch"]),
                    Number(pose["yaw"])
                );
            }
        }
    }, [props.data]);
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ flex: 1}}>
                <urdf-custom-manipulator 
                ref={ref} 
                style={{ height: '100%' }}
                up={props.up}
                no-auto-recenter={true}
                ></urdf-custom-manipulator>
            </div>
        </div>
    );
};

export default URDFViewerComponent;
