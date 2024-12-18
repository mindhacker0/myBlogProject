import {Editor, MoveEventContext, PluginEvent, setThemeConfig} from 'amis-editor';
import {registerEditorPlugin} from 'amis-editor';
import { useContext, useState } from 'react';
import { SchemaObject, setDefaultTheme } from 'amis';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import { ServiceSchema } from 'amis/lib/renderers/Service';
import { ContainerSchema } from 'amis/lib/renderers/Container';
import themeConfig from 'amis-theme-editor-helper/lib/systemTheme/cxd';
import { WorkFlowPlugin } from '../WorkFlow/Plugin';
import "../WorkFlow";
import '../Urdf';
import { RobotPlugin } from '../Urdf/Plugin';
import { ManagerEditorPlugin } from './PluginManager';
import { ControllerXPlugin } from '../TCPControl/Plugin';
import {GlobalContext} from '@/models/global';
setDefaultTheme('cxd');
setThemeConfig(themeConfig);
registerEditorPlugin(WorkFlowPlugin);
registerEditorPlugin(RobotPlugin);
registerEditorPlugin(ControllerXPlugin);
registerEditorPlugin(ManagerEditorPlugin);

const defaultConfig:ServiceSchema = {
    type: "service",
    ws: "ws://localhost:8765",
    body: [],
};

const LowCodeEditor = ()=>{
        console.log("editor level",useContext(GlobalContext))

    const [value,setValue] = useState<SchemaObject>(defaultConfig);
    const onEditorChange = (value:SchemaObject)=>{
        console.log("change",value);
        setValue(value);
    }
    const onAfterMove = (event: PluginEvent<MoveEventContext>)=>{
        console.log("event",event)
    }
    return <Editor 
    value={value} 
    onChange={onEditorChange} 
    theme='cxd' 
    afterMove={onAfterMove}
    //amisEnv={{enableAMISDebug:true}} //调试模式
    />
}

export default LowCodeEditor;