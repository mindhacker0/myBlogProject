import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../reducers/modal/constant";
import LoginModal from "../components/loginModal";
// 高阶组件，弹窗层
const ModalHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const {loginModal,closeModal,...componentProps} = this.props;
            return  <div className="modals-wear">
            <LoginModal isOpen={loginModal} onClose={()=>{closeModal("loginModal")}}/>
            <WrappedComponent { ...componentProps }/>
        </div>
        }
    }
    const mapStateToProps = (state) => {
        const {loginModal}=state.modal;
        return {
            loginModal
        }
    };
    const mapDispatchToProps = (dispatch) => ({
        closeModal:(modalName)=>dispatch(closeModal({modalName}))
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppWapper);
}

export default ModalHoc;