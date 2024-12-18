export interface Socket {
    connect(options: SocketOptions, callback: () => void): void;
    disconnect(): void;
    send(data: any, callback?: () => void): void;
    on(event: string, callback: (data: any) => void): void;
    off(event: string): void;
}
  