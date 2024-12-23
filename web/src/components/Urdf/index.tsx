import {IScopedContext, Renderer, RendererProps, ScopedContext} from 'amis';
import URDFViewer from '@/urdf/urdf-viewer';
import { Component } from 'react';
import { RobotInfo } from '@/types/robot';

interface MyRectProps extends RendererProps {
  style?:React.CSSProperties;
}


@Renderer({
  type: 'robot',
  name: 'robot'
})
export default class Robot extends Component<MyRectProps, object> {
  static contextType = ScopedContext;
  static propsList: string[] = ['style', 'data', 'className'];

  declare context: React.ContextType<typeof ScopedContext>;

  constructor(props: MyRectProps) {
    super(props);
    const scoped = props.scopeRef?.() as IScopedContext;
    scoped?.registerComponent(this);
  }
  componentDidMount(): void {
  }
  componentWillUnmount(): void {
    this.context.unRegisterComponent(this);
  }
  render() {
    return <div
    style={{ 
      width: this.props.width,
      height: this.props.height,
      ...this.props?.style
    }}>
      <URDFViewer data={this.props.data as RobotInfo} up="+Y"/>
    </div>;
  }
}