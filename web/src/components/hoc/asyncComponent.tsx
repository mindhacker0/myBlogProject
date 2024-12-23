import React from "react";

interface AsyncState {
    component: React.ComponentType<any> | null;
}

export default function asyncComponent(importComponent: () => Promise<{ default: React.ComponentType<any> }>) {
    class AsyncComponent extends React.Component<{}, AsyncState> {
        constructor(props: {}) {
            super(props);
            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({component});
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}