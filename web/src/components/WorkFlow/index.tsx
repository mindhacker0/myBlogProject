import * as React from 'react';
import {Renderer, RendererProps} from 'amis';
import TreeVisualizer from './treeVisualizer';

interface MyRectProps extends RendererProps {
}


@Renderer({
  type: 'workflow',
  name: 'workflow'
})
export default class TreeVisualizerCom extends React.Component<MyRectProps> {
  render() {
    console.log(this.props);
    return <TreeVisualizer />;
  }
}