declare global {
  interface Window {
    $api: any;
    _socket: WebSocket;
    _socketIsEnabled: boolean;
  }
}