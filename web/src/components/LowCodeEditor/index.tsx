import {Editor, MoveEventContext, PluginEvent, setThemeConfig,registerEditorPlugin} from 'amis-editor';
import { useContext, useState } from 'react';
import { SchemaObject, setDefaultTheme } from 'amis';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import './editor.css';
import { ServiceSchema } from 'amis/lib/renderers/Service';
import themeConfig from 'amis-theme-editor-helper/lib/systemTheme/cxd';
import { WorkFlowPlugin } from '../WorkFlow/Plugin';
// 注意注册组件要导入一下
import "../WorkFlow";
import '../Urdf';
import '../JointControl';
import '../TCPControl';
import '../ActionBar';
import { RobotPlugin } from '../Urdf/Plugin';
import { ManagerEditorPlugin } from './PluginManager';
import { ControllerXPlugin } from '../TCPControl/Plugin';
import { ControllerJPlugin } from '../JointControl/Plugin';
import { ActionBarPlugin } from '../ActionBar/Plugin';
import EditorContextProvider, { EditorContext } from './editorContext';
import eventBus from '@/common/eventBus';
import WebSocketManager from '@/utils/WebSocketManager';

setDefaultTheme('cxd');
setThemeConfig(themeConfig);
registerEditorPlugin(WorkFlowPlugin);
registerEditorPlugin(RobotPlugin);
registerEditorPlugin(ControllerXPlugin);
registerEditorPlugin(ControllerJPlugin);
registerEditorPlugin(ManagerEditorPlugin);
registerEditorPlugin(ActionBarPlugin);

const defaultConfig:any = {
    type: "service",
    ws: "ws://localhost:8765",
    body: [],
};
export interface WsObject {
    url: string;
    responseKey?: string;
    body?: any;
}

const wsRewrite = (ws: WsObject, onMessage: (event: MessageEvent) => void, onError: (error: Error) => void) => {//重写内置的wsFetcher
    const wsManager = new WebSocketManager(ws.url);
    wsManager.addEventListener("message",(event: MessageEvent)=>{
        const data = JSON.parse(event.data);
        onMessage(data);
        eventBus.emit('robotInfoChange', data);
        window._socketIsEnabled = data.isEnabled;
    });
    wsManager.addEventListener("close",(event: Event)=>{
        window._socketIsEnabled = false;
    });
    wsManager.addEventListener("error",(error: Event)=>{
        onError(new Error("ws fetcher error!"));
    });
    return {
        instance: wsManager,
        close: wsManager.close
    };
}

const AmisEditor = ()=>{
    const {setWsInstance} = useContext(EditorContext);
    const [value,setValue] = useState<SchemaObject>(defaultConfig);
    const onEditorChange = (value:SchemaObject)=>{
        console.log("change",value);
        setValue(value);
    }
    const onAfterMove = (event: PluginEvent<MoveEventContext>)=>{
        console.log("move event",event)
    }
    const wsProxy = (ws: WsObject, onMessage: (event: MessageEvent) => void, onError: (error: Error) => void)=>{//获取内部新建后的ws实例,用来发送ws消息
        const {instance,close} = wsRewrite(ws,onMessage,onError);
        setWsInstance(instance);
        window._socket = instance;
        return {
            close
        }
    }
    return (<Editor
        className='h-full hmi-editor'
        value={value} 
        onChange={onEditorChange} 
        theme='cxd' 
        afterMove={onAfterMove}
        amisEnv={{
            enableAMISDebug:false,//调试模式
            wsFetcher:wsProxy
        }}
    />)
}

const LowCodeEditor = ()=>{
    return (<EditorContextProvider>
       <AmisEditor />
    </EditorContextProvider>)
}

export default LowCodeEditor;

// 修改选中组件的顶部功能栏 https://aisuda.bce.baidu.com/amis/zh-CN/docs/extend/editor#%E5%A6%82%E4%BD%95%E6%9E%84%E5%BB%BA%E7%82%B9%E9%80%89%E6%A1%86%E9%A1%B6%E9%83%A8%E8%8F%9C%E5%8D%95
// 右键菜单 https://aisuda.bce.baidu.com/amis/zh-CN/docs/extend/editor#%E5%A6%82%E4%BD%95%E6%9E%84%E5%BB%BA%E4%B8%8A%E4%B8%8B%E6%96%87%E5%8A%9F%E8%83%BD%E8%8F%9C%E5%8D%95
// 服务容器的WS只有组件挂载和ws属性改变的情况下调用,需要重写fetch方法。