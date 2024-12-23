import {IScopedContext, Renderer, RendererProps, ScopedContext} from 'amis';
import Status from './status';
import React from 'react';

interface ActionBarProps extends RendererProps {
    style?:React.CSSProperties;
}

@Renderer({
  type: 'robot-action-bar',
  name: 'robot-action-bar'
})
export default class ActionBarCom extends React.Component<ActionBarProps> {
    static contextType = ScopedContext;
    static propsList: string[] = ['style', 'className', 'data'];

    declare context: IScopedContext;

    constructor(props: ActionBarProps) {
        super(props);
        const scoped = props.scopeRef?.() as IScopedContext;
        scoped?.registerComponent(this);
    }
    componentWillUnmount(): void {
        this.context.unRegisterComponent(this);
    }
    render() {
        return (<div style={this.props.style}><Status /></div>);
    }
}