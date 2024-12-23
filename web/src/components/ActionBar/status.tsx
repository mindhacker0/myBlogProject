import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { RobotInfo } from '@/types/robot';
interface StatusProps {
    data?: RobotInfo;
}
const Status: React.FC<StatusProps> = (props) => {
  return (
    <div className="font-base mt-2.5">
        当前状态：{props.data?.isEnabled ? <span className="text-green"><CheckOutlined /> 已启动</span> : <span className="text-grey"><CloseOutlined /> 未启动</span>}
    </div>
  );
}

export default Status;