import URDFCustomManipulator from "@/urdf/URDFCustomManipulator";
import WebSocketManager from "@/utils/WebSocketManager";
import { createContext, useState } from "react";
import { JointPositions } from "@/types/robot";

interface EditorContextProps {
    urdfInstance:URDFCustomManipulator|null; // urdf实例
    setUrdfInstance: (v:URDFCustomManipulator|null) => void;
    wsInstance:WebSocketManager|null; // ws实例
    setWsInstance: (v:WebSocketManager|null) => void;
    socketSendLog:SocketSendLog[]; // socket主动发消息日志
    setSocketSendLog: (v:SocketSendLog[]) => void;
    clearSocketSendLog:()=>void;
    socketSend:(data:any)=>void;
    originJoints:JointPositions|null; // 原始关节状态
    setOriginJoints: (v:JointPositions|null) => void;
}

// socket主动发消息日志
type SocketSendLog = {
    time: Date;
    content: string
}

const EditorContext = createContext<EditorContextProps>({
    urdfInstance:null,
    setUrdfInstance:()=>{},
    wsInstance:null,
    setWsInstance:()=>{},
    socketSendLog:[],
    setSocketSendLog:()=>{},
    clearSocketSendLog:()=>{},
    socketSend:()=>{},
    originJoints:null,
    setOriginJoints:()=>{}
});


const EditorContextProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [urdfInstance, setUrdfInstance] = useState<URDFCustomManipulator|null>(null);
    const [wsInstance, setWsInstance] = useState<WebSocketManager|null>(null);
    const [socketSendLog, setSocketSendLog] = useState<SocketSendLog[]>([]);
    const [originJoints, setOriginJoints] = useState<JointPositions|null>(null);

    const socketSend = (data:any)=>{
        console.log('socketSend',data)
        if(!wsInstance) return;
        wsInstance.send(data);
        setSocketSendLog([
            {time:new Date(),content:data},
            ...socketSendLog
        ])
    }
    const contextValue:EditorContextProps = {
        urdfInstance,
        setUrdfInstance,
        wsInstance,
        setWsInstance,
        socketSendLog,
        setSocketSendLog,
        clearSocketSendLog:()=>{
            setSocketSendLog([])
        },
        socketSend,
        originJoints,
        setOriginJoints
    }
    return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>
}

export default EditorContextProvider;
export {EditorContext};
