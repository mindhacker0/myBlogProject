import {BasePlugin} from 'amis-editor';

export class WorkFlowPlugin extends BasePlugin {
  // 这里要跟对应的渲染器名字对应上
  // 注册渲染器的时候会要求指定渲染器名字
  rendererName = 'workflow';

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json';

  // 用来配置名称和描述
  name = '流程图';
  description = '这只是个示例';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['表单项'];

  // 图标
  icon = 'fa fa-user';

  // 用来生成预览图的
  previewSchema = {
    type: 'workflow',
    target: 'demo'
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'workflow',
    target: '233'
  };

  // 右侧面板相关
  panelTitle = '流程图';
  panelBody = [
    {
      type: 'tabs',
      tabsMode: 'line',
      className: 'm-t-n-xs',
      contentClassName: 'no-border p-l-none p-r-none',
      tabs: [
        {
          title: '常规',
          body: [
            {
              name: 'target',
              label: 'Target',
              type: 'input-text'
            }
          ]
        },

        {
          title: '外观',
          body: []
        }
      ]
    }
  ];
}


