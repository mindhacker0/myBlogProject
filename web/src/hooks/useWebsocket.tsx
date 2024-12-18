import { useState, useEffect, useRef, useContext } from 'react';
import eventBus from '@/common/eventBus';
import { GlobalContext } from '@/models/global';

const RECONNECT_INTERVAL = 2000;
const RECONNECT_MAX_COUNT = 200;

class WebSocketManager {
  static instance:WebSocketManager;
  private ws:WebSocket | null = null;
  url:string;
  private reconnectCount: number = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  constructor(url:string){
    this.url = url;
    this.createConnect();
  }
  createConnect(){
    this.ws = new WebSocket(this.url);
    this.reconnectCount = 0;
    this.reconnectTimer = null;
  }
  static getInstance(){
    return this.instance;
  }
  close(){
    this.ws?.close();
  }
  reconnect(){
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null
    }
    // 重连
    if (this.reconnectCount <= RECONNECT_MAX_COUNT) {
      this.reconnectTimer = setTimeout(() => {
        console.log('websocket 重连第' + this.reconnectCount + '次');
        this.createConnect();
        this.reconnectCount++;
      }, RECONNECT_INTERVAL);
    } else {
      this.ws?.close();
    }
  }
  addEventListener(type:keyof WebSocketEventMap,callback:(this: WebSocket, ev: Event | CloseEvent | MessageEvent<any>) => any){
    this.ws?.addEventListener(type,callback);
  }
}

function useWebSocket(url: string) {
  const global = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectCount = useRef(1);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const status = useRef(0);

  const _connect = () => {
    const ws = new WebSocket(url)
    setSocket(ws);
    global.setSocket(ws);
    return ws;
  }

  const _reconnect = () => {
    _claerReconnectTimer();
    // 重连
    if (reconnectCount.current <= RECONNECT_MAX_COUNT) {
      reconnectTimer.current = setTimeout(() => {
        console.log('websocket 重连第' + reconnectCount.current + '次');
        const ws = _connect();
        _bindEvent(ws);
        reconnectCount.current++;
      }, RECONNECT_INTERVAL);
    } else {
      socket?.close();
    }
  }

  const _claerReconnectTimer = () => {
    if (reconnectTimer.current !== null) {
      clearTimeout(reconnectTimer.current)
      reconnectTimer.current = null
    }
  }

  const _bindEvent = (ws: WebSocket) => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // console.log(data)
      setData(data);
      eventBus.emit('robotInfoChange', data);
      status.current = 1;
      window._socketIsEnabled = data.isEnabled;
    };
  
    ws.onerror = (e) => {
      console.error(e)
      _reconnect()
    }

    ws.onclose = (e) => {
      console.log('onclose', e, status.current)
      if (status.current === 1) {
        // 有一种情况：后端突然故障，js不会走到onerror，只会走onclose。所以在这里判断一下重连逻辑
        _reconnect();
        global.setRobotInfo({
          ...global.robotInfo,
          isEnabled: false
        })
        window._socketIsEnabled = false;
        status.current = 0
      }
      console.log('webSocket 已关闭')
    }
  }

  useEffect(() => {
    const ws = _connect();

    _bindEvent(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, socket };
}

export default useWebSocket;
