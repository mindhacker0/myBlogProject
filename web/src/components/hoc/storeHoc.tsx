import React, { ComponentType } from "react";
import { Provider } from "react-redux";
import store from "@/store";

const AppStateHoc = (WrappedComponent: ComponentType<any>) => {
    class AppWapper extends React.Component<any> {
        constructor(props: any) {
            super(props);
        }
        render() {
            const { ...componentProps } = this.props;
            return <Provider store={store}>
                <WrappedComponent { ...componentProps }/>
            </Provider>
        }
    }
    return AppWapper;
}

export default AppStateHoc;