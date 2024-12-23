
import { Button, Input } from 'antd';
import './singleButtons.less';
import { InfoCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext, Key } from 'react';
import { formatDate } from '@/utils/date';
import ReactJson from 'react-json-view';
import { EditorContext } from './LowCodeEditor/editorContext';

export default function SocketLog() {
    const {socketSendLog,clearSocketSendLog} = useContext(EditorContext);
    const [visible, setVisible] = useState(false);
    const handleBtnClick = () => {
        setVisible(!visible)
    }
    const _clear = () => {
        clearSocketSendLog();
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end'
        }}>
            {visible ? <div
                style={{
                    width: 420,
                    height: 450,
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 12,
                    border: '#ddd solid 1px',
                    borderRadius: '6px',
                    backgroundColor: '#fff'
                }}
            >
                <div style={{
                    flex: 1,
                    marginBottom: 10,
                    overflow: 'auto',
                }}>
                {
                    socketSendLog.map((v: { time: Date; content: string; }, idx: Key | null | undefined) => {
                        return (
                            <div key={idx}>
                                <div>{formatDate(v.time)}</div>
                                <div style={{ marginBottom: 20 }}>
                                    <ReactJson src={JSON.parse(v.content)} collapsed={1} iconStyle="square" />
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div><Button variant="outlined" size="small" onClick={() => _clear()}>清除消息</Button></div>
            </div> : null}
            <Button color="primary" variant="outlined" onClick={() => handleBtnClick()}>
                {/* <InfoCircleOutlined /> */}
                <MessageOutlined />
            </Button>
        </div>
    );
}