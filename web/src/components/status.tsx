import { useModel } from '@umijs/max';
import '@/styles/com.less';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function Status() {
  const global = useModel('global');

  return (
    <div style={{
      fontSize: 16,
      marginTop: 10
    }}>
        当前状态：{global.robotInfo.isEnabled ? <span className="color-green"><CheckOutlined /> 已启动</span> : <span className="color-grey"><CloseOutlined /> 未启动</span>}
    </div>
  );
}