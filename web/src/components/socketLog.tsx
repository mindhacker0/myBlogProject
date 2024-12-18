
import { Button, Input } from 'antd';
import './singleButtons.less';
import { InfoCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { useState, useEffect, useContext } from 'react';
import { formatDate } from '@/utils/date';
import ReactJson from 'react-json-view';
import { GlobalContext } from '@/models/global';
const { TextArea } = Input;

type KeyValue = {[k: string] : any};

export default function SocketLog() {
    const global = useContext(GlobalContext);
    const [visible, setVisible] = useState(false);
    const handleBtnClick = () => {
        setVisible(!visible)
    }
    const _clear = () => {
        global.clearSocketSendLog();
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
                    global.socketSendLog.map((v, idx) => {
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