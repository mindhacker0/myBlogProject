
import { Button, Popconfirm } from 'antd';
import './singleButtons.less';
import { useContext } from 'react';
import { EditorContext } from './LowCodeEditor/editorContext';

type BtnEvent = 'enable' | 'reset' | 'estop'

export default function Status() {
  const {socketSend} = useContext(EditorContext);

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
    socketSend(param);
  }

  return (
    <div className="single-btns">
      <Button color="primary" variant="solid" onClick={() => handleBtnClick('enable')}>使能</Button>
      <Button color="primary" variant="outlined" onClick={() => handleBtnClick('reset')}>复位</Button>
      <Button color="danger" variant="outlined" onClick={() => handleBtnClick('estop')}>急停</Button>
    </div>
  );
}