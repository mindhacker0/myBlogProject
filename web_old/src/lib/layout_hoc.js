import React from "react";
import { connect } from "react-redux";
import Header from "../components/header";
const LayoutHoc=(WrappedComponent)=>{
    let path = window.location.pathname;
    const blackList = ["/editor"];
    let showHead = !blackList.includes(path);
    const AppWapper = ()=>{
        return  <div className='app-layout'>
            {showHead && <Header />}
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