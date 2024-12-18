import * as React from 'react';
import {IScopedContext, Renderer, RendererProps, ScopedContext} from 'amis';
import URDFViewer from '@/urdf/urdf-viewer';

interface MyRectProps extends RendererProps {
    style?:React.CSSProperties;
}


@Renderer({
  type: 'robot',
  name: 'robot'
})
export default class Robot extends React.Component<MyRectProps> {
  static contextType = ScopedContext;

  declare context: React.ContextType<typeof ScopedContext>;

  constructor(props: MyRectProps, scoped: IScopedContext) {
    super(props);
    console.log(props,scoped)
    scoped.registerComponent(this);
  }
  componentDidMount(): void {
  }
  componentWillUnmount(): void {
    this.context.unRegisterComponent(this);
  }
  render() {
    return <div 
    style={{ 
      width: 500,
      height: 500,
      ...this.props?.style
    }}>
      <URDFViewer {...this.props} up="+Y"/>
    </div>;
  }
}