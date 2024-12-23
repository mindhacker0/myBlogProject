import {IScopedContext, Renderer, RendererProps, ScopedContext} from 'amis';
import ControllerX from './controllerX';
import React from 'react';
import { RobotInfo } from '@/types/robot';

interface ControllerXProps extends RendererProps {
    style?:React.CSSProperties;
}

@Renderer({
  type: 'tcp-control',
  name: 'tcp-control'
})
export default class ControllerXCom extends React.Component<ControllerXProps, object> {
    static contextType = ScopedContext;
    static propsList: string[] = ['style', 'className', 'data'];

    declare context: React.ContextType<typeof ScopedContext>;

    constructor(props: ControllerXProps) {
        super(props);
        const scoped = props.scopeRef?.() as IScopedContext;
        scoped?.registerComponent(this);
    }
    componentWillUnmount(): void {
        this.context.unRegisterComponent(this);
    }
    render() {
        return <ControllerX style={this.props.style} data={this.props.data as RobotInfo}/>;
    }
}