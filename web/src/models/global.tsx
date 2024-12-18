// 全局共享数据示例
// import { DEFAULT_NAME } from '@/constants';
import React, { createContext, useContext, useState } from 'react';
import { message } from 'antd';
import { Pose, JointPositions, RobotInfo } from '@/types/robot';

const GlobalContext = createContext<any>({
  originJoints:undefined,
  setOriginJoints:(v:undefined)=>{},
  joints:[],
  robotInfo:{},
  setRobotInfo:(v:RobotInfo)=>{},
  socket:null,
  setSocket:(v:WebSocket)=>{},
  socketSend:(v:any)=>{},
  socketSendLog:[],
  clearSocketSendLog:()=>{}
});

const GlobalDataProvider:React.FC<{children:React.ReactElement}> = ({children}) => {
  const [originJoints, setOriginJoints] = useState();
  const [joints, setJoints] = useState([]);
  const [robotInfo, setRobotInfo] = useState<RobotInfo>({
    "jointPositions": {
      "J1": 0,
      "J2": 0,
      "J3": 0,
      "J4": 0,
      "J5": 0,
      "J6": 0
    },
    "pose": {
      "x": 0,
      "y": 0,
      "z": 0,
      "roll": 0,
      "pitch": 0,
      "yaw": 0
    },
    "isEnabled": false,
    "isMoving": false
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [test,setTest] = useState<string>("");
  // socket主动发消息日志
  type SocketSendLog = {
    time: Date;
    content: string
  }
  const [socketSendLog, setSocketSendLog] = useState<SocketSendLog[]>([]);

  const contextValue =  {
    originJoints,
    setOriginJoints,
    joints,
    // setJoints: (val: PartialJointPositions) => {
    //   console.log('setJoints', val)
    //   for(let k in robotInfo.jointPositions) {
    //     robotInfo.jointPositions[k] = val[k]
    //   }
    //   setRobotInfo(robotInfo)
    //   setJoints(Object.values(val))
    // },
    robotInfo,
    setRobotInfo,
    socket,
    setSocket: (ws: WebSocket) => {
      setSocket(ws)
      window._socket = ws;
    },
    // socket主动发送信息方法
    socketSend: (param: any) => {
      console.log(`socketSend: ${param}`);
      
      if (!socket && !window._socket) { 
        console.log('socket', socket)
        return
      }
      if (!robotInfo.isEnabled && !window._socketIsEnabled) {
        console.log('isEnabled', robotInfo.isEnabled)
        message.error('WebSocket状态异常')
        return
      }
      const content = JSON.stringify(param);
      (socket || window._socket).send(content);
      setSocketSendLog([
        {
          time: new Date(),
          content
        },
        ...socketSendLog
      ])
    },
    socketSendLog,
    clearSocketSendLog: () => {
      setSocketSendLog([])
    }
    
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
};

export {GlobalContext,GlobalDataProvider} ;
