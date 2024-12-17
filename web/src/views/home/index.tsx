import React from "react";
import Styles from "./home.css";
import Status from '@/components/status';
import SingleButtons from '@/components/singleButtons';
import TreeVisualizer from '@/components/WorkFlow/treeVisualizer';
import RobotModel from '@/components/Urdf';
import ControllerX from '@/components/TCPControl/controllerX';
import ControllerJ from '@/components/JointControl/controllerJ';
import SocketLog from '@/components/socketLog';
import { useEffect, useMemo } from 'react';
// import WebSocket from 'ws';
import useWebSocket from '@/hooks/useWebsocket';
import { degreesToRadians, radiansToDegrees } from '@/utils/index';
import LowCodeEditor from '@/components/LowCodeEditor';

console.log('degreesToRadians', degreesToRadians(180))
console.log('radiansToDegrees', radiansToDegrees(3.14))

function HomePage() {
  const TreeVisualizerCom = useMemo(() => <TreeVisualizer />, []);
  const ControllerXCom = useMemo(() => <ControllerX />, []);
  const ControllerJCom = useMemo(() => <ControllerJ />, []);
  return (
    <div>
    <div className="page-wapper">
      {/* <div className="com-tools"></div> */}

      <div className="main-body">
        <div className="flex space-between align-items-center">
          <Status />
          <SingleButtons />
        </div>

        <div className="flex" style={{ marginTop: 20 }}>
          {TreeVisualizerCom}
        </div>

        <div className="flex" style={{
          marginTop: 20
        }}>
          {/* <ControllerX />
          <ControllerJ /> */}
          {ControllerXCom}
          {ControllerJCom}
          {/* WebSocket日志组件 */}
          <div style={{
            position: 'fixed',
            bottom: 5,
            right: 5
          }}>
            <SocketLog />
          </div>
        </div>

      </div>
    </div>
    <LowCodeEditor />
</div>
);
}

export default HomePage;