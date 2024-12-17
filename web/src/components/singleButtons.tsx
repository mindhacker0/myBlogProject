
import { Button, Popconfirm } from 'antd';
import './singleButtons.less';
import { useModel } from '@umijs/max';

type BtnEvent = 'enable' | 'reset' | 'estop'

export default function Status() {
  const global = useModel('global');

  const handleBtnClick = (event: BtnEvent) => {
    const param : {
      event: string
      status?: boolean
    } = {
      event
    }
    switch(event) {
      case 'enable':
        param.status = true
        break;
    }
    global.socketSend(param)
  }

  return (
    <div className="single-btns">
      <Button color="primary" variant="solid" onClick={() => handleBtnClick('enable')}>使能</Button>
      <Button color="primary" variant="outlined" onClick={() => handleBtnClick('reset')}>复位</Button>
      <Button color="danger" variant="outlined" onClick={() => handleBtnClick('estop')}>急停</Button>
    </div>
  );
}