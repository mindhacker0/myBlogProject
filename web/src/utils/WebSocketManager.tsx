const RECONNECT_INTERVAL = 2000;
const RECONNECT_MAX_COUNT = 200;

export default class WebSocketManager {
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
  close(){
    this.ws?.close();
  }
  send(data:any){
    this.ws?.send(JSON.stringify(data));
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
      }, RECONNECT_INTERVAL) as unknown as NodeJS.Timeout;
    } else {
      this.ws?.close();
    }
  }
  addEventListener<K extends keyof WebSocketEventMap>(type:K,callback:(this: WebSocket, ev: WebSocketEventMap[K]) => any){
    this.ws?.addEventListener(type,callback);
  }
}