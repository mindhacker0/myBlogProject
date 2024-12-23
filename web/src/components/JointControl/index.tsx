import {IScopedContext, Renderer, RendererProps, ScopedContext} from 'amis';
import ControllerJ from './controllerJ';
import React from 'react';
import { RobotInfo } from '@/types/robot';

interface ControllerJProps extends RendererProps {
    style?:React.CSSProperties;
}

@Renderer({
  type: 'joint-control',
  name: 'joint-control'
})
export default class ControllerJCom extends React.Component<ControllerJProps, object> {
    static contextType = ScopedContext;
    static propsList: string[] = ['style', 'className', 'data'];

    declare context: React.ContextType<typeof ScopedContext>;

    constructor(props: ControllerJProps) {
        super(props);
        const scoped = props.scopeRef?.() as IScopedContext;
        scoped?.registerComponent(this);
    }
    componentDidMount(): void {
        console.log("render controllerJ",this);
    }
    componentWillUnmount(): void {
        this.context.unRegisterComponent(this);
    }
    render() {
        return <ControllerJ style={this.props.style} data={this.props.data as RobotInfo}/>;
    }
}