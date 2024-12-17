import * as React from 'react';
import {IScopedContext, Renderer, RendererProps, ScopedContext} from 'amis';
import ControllerX from './controllerX';

interface ControllerXProps extends RendererProps {

}

@Renderer({
  type: 'tcp-control',
  name: 'tcp-control'
})
export default class ControllerXCom extends React.Component<ControllerXProps> {
    static contextType = ScopedContext;

    declare context: React.ContextType<typeof ScopedContext>;

    constructor(props: ControllerXProps, scoped: IScopedContext) {
        super(props);
        console.log(props,scoped)
        scoped.registerComponent(this);
    }
    componentWillUnmount(): void {
        this.context.unRegisterComponent(this);
    }
    render() {
        console.log(this.props);
        return <ControllerX />;
    }
}