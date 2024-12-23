import {BasePlugin} from 'amis-editor';

export class ControllerJPlugin extends BasePlugin {
  // 这里要跟对应的渲染器名字对应上
  // 注册渲染器的时候会要求指定渲染器名字
  rendererName = 'joint-control';

  // 用来配置名称和描述
  name = '关节控制';
  description = '机器人关节控制';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['功能'];

  // 图标
  icon = 'fa fa-user';

  // 用来生成预览图的
  previewSchema = {
    type: 'joint-control',
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'joint-control',
  };

  // 右侧面板相关
}


