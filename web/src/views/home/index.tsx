import './index.less';
import Status from '@/components/status';
import SingleButtons from '@/components/singleButtons';
import TreeVisualizer from '@/components/WorkFlow/treeVisualizer';
import ControllerX from '@/components/TCPControl/controllerX';
import ControllerJ from '@/components/JointControl/controllerJ';
import SocketLog from '@/components/socketLog';
import { useContext, useEffect, useMemo } from 'react';
import useWebSocket from '@/hooks/useWebsocket';
import { degreesToRadians, radiansToDegrees } from '@/utils/index';
import LowCodeEditor from '@/components/LowCodeEditor';
import { GlobalContext, GlobalDataProvider } from "../../models/global";

function HomePage() {
  const url = 'ws://localhost:8765'
  const { data, socket } = useWebSocket(url);
  const global = useContext(GlobalContext);

  useEffect(() => {
    if (data) {
      global.setRobotInfo(data);
    }
  }, [data]);
  const TreeVisualizerCom = useMemo(() => <TreeVisualizer />, []);
  const ControllerXCom = useMemo(() => <ControllerX />, []);
  const ControllerJCom = useMemo(() => <ControllerJ />, []);
  return (
  <GlobalDataProvider>
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
</GlobalDataProvider>
);
}

export default HomePage;