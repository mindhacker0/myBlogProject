import { Up } from "@/urdf/urdf-viewer";
import URDFCustomManipulator from "@/urdf/URDFCustomManipulator";
import WebSocketManager from "@/utils/WebSocketManager";

declare global {
    interface Window {
      _socket: WebSocketManager;
      _socketIsEnabled: boolean;
    }
}
// 声明urdf-custom-manipulator为react组件
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
        'urdf-custom-manipulator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            ref?: React.RefObject<URDFCustomManipulator|null>;
            style?: React.CSSProperties;
            up?: Up;
        };
    }
  }
}
export {}; 