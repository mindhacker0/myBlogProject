import { RendererEventContext } from "amis";
import { BasePlugin, BasicSubRenderInfo, registerEditorPlugin, SubRendererInfo } from "amis-editor";

// 需要在组件面板中展示的组件
const enabledRenderers = [
  'robot', // 机器人
  'workflow', // 流程图
  'page', // 页面
  'button', // 按钮
  'plain', // 文本
  'container',// 自由容器
  'service',// 数据容器
  'input-range', //滑块
  'tcp-control', //TCP控制块
];
  
export class ManagerEditorPlugin extends BasePlugin {
    order = 9999;
  
    buildSubRenderers(
      context: RendererEventContext,
      renderers: Array<SubRendererInfo>
    ): BasicSubRenderInfo | Array<BasicSubRenderInfo> | void {
        console.log("renderers",renderers);
      // 更新NPM自定义组件排序和分类
      for (let index = 0, size = renderers.length; index < size; index++) {
        // 判断是否需要隐藏 Editor预置组件
        const pluginRendererName = renderers[index].rendererName;
        if (
          pluginRendererName &&
          enabledRenderers.indexOf(pluginRendererName) === -1
        ) {
          renderers[index].disabledRendererPlugin = true; // 更新状态
        }
      }
    }
}