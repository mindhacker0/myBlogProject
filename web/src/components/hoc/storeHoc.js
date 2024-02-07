import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
const AppStateHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const { ...componentProps } = this.props;
            return <Provider store={store}>
                <WrappedComponent { ...componentProps }/>
            </Provider>
        }
    }
    return AppWapper;
}
export default AppStateHoc;