import React from "react";
import { connect } from "react-redux";

const ModalHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const {loginModal,noticeModal,videoModal,projectModal,closeModal,...componentProps} = this.props;
            return  <div className="modals-wear">
            {/* <VideoModal isOpen={videoModal} onClose={()=>{closeModal("videoModal")}}/> */}
            <WrappedComponent { ...componentProps }/>
        </div>
        }
    }
    const mapStateToProps = (state) => {
        return {
         
        }
    };
    const mapDispatchToProps = (dispatch) => ({
        
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppWapper);
}

export default ModalHoc;