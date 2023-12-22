import React from "react";
import { connect } from "react-redux";
const LayoutHoc=(WrappedComponent)=>{
    const AppWapper = ()=>{
        return  <div className='app-layout'>
            <div className='content'><WrappedComponent /></div>
            {/* <Footer /> */}
        </div>
    }
    const mapStateToProps = (state) => {
        return {
           
        }
    };
    const mapDispatchToProps = (dispatch) => ({
        
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppWapper);
}

export default LayoutHoc;