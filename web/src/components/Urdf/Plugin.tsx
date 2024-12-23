import {ActiveEventContext, BasePlugin, BasicPanelItem, BuildPanelEventContext, LayoutBasePlugin, PluginEvent, ResizeMoveEventContext} from 'amis-editor';
import FileSelector from '../FileSelector';

export class RobotPlugin extends BasePlugin {
  // 这里要跟对应的渲染器名字对应上
  // 注册渲染器的时候会要求指定渲染器名字
  rendererName = 'robot';

  // 用来配置名称和描述
  name = '机器人';
  description = '展示机器人图像';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['功能'];

  // 图标
  icon = 'fa fa-user';

  // 用来生成预览图的
  previewSchema = {
    type: 'robot',
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'robot',
  };

  // 右侧面板相关
  buildEditorPanel(
    context: BuildPanelEventContext,
    panels: Array<BasicPanelItem>
  ) {
    if(context.schema.type === 'robot'){
      panels.push({
        key: 'robot-panel',
        title: '设置',
        icon: '',
        render: (props) => {
          return <div className="p-5">
            <div>
              <div><span>文件选择</span></div>
              <FileSelector />
            </div>
          </div>
        }
      })
    }
  }
  onActive(event: PluginEvent<ActiveEventContext>) {
    const context = event.context;
  
    if (context.info?.plugin !== this || !context.node) {
      return;
    }
  
    const node = context.node!;
    node.setHeightMutable(true);
    node.setWidthMutable(true);
  }
  
  onWidthChangeStart(
    event: PluginEvent<
      ResizeMoveEventContext,
      {
        onMove(e: MouseEvent): void;
        onEnd(e: MouseEvent): void;
      }
    >
  ) {
    return this.onSizeChangeStart(event, 'horizontal');
  }
  
  onHeightChangeStart(
    event: PluginEvent<
      ResizeMoveEventContext,
      {
        onMove(e: MouseEvent): void;
        onEnd(e: MouseEvent): void;
      }
    >
  ) {
    return this.onSizeChangeStart(event, 'vertical');
  }
  
  onSizeChangeStart(
    event: PluginEvent<
      ResizeMoveEventContext,
      {
        onMove(e: MouseEvent): void;
        onEnd(e: MouseEvent): void;
      }
    >,
    direction: 'both' | 'vertical' | 'horizontal' = 'both'
  ) {
    const context = event.context;
    const node = context.node;
    if (node.info?.plugin !== this) {
      return;
    }
  
    const resizer = context.resizer;
    const dom = context.dom;
    const frameRect = dom.parentElement!.getBoundingClientRect();
    const rect = dom.getBoundingClientRect();
    const startX = context.nativeEvent.pageX;
    const startY = context.nativeEvent.pageY;
  
    event.setData({
      onMove: (e: MouseEvent) => {
        const dy = e.pageY - startY;
        const dx = e.pageX - startX;
        const height = Math.max(50, rect.height + dy);
        const width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
        const state: any = {
          width,
          height
        };
  
        if (direction === 'both') {
          resizer.setAttribute('data-value', `${width}px x ${height}px`);
        } else if (direction === 'vertical') {
          resizer.setAttribute('data-value', `${height}px`);
          delete state.width;
        } else {
          resizer.setAttribute('data-value', `${width}px`);
          delete state.height;
        }
  
        node.updateState(state);
  
        requestAnimationFrame(() => {
          node.calculateHighlightBox();
        });
      },
      onEnd: (e: MouseEvent) => {
        const dy = e.pageY - startY;
        const dx = e.pageX - startX;
        const height = Math.max(50, rect.height + dy);
        const width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
        const state: any = {
          width,
          height
        };
  
        if (direction === 'vertical') {
          delete state.width;
        } else if (direction === 'horizontal') {
          delete state.height;
        }
  
        resizer.removeAttribute('data-value');
        node.updateSchema(state);
        requestAnimationFrame(() => {
          node.calculateHighlightBox();
        });
      }
    });
  }
}