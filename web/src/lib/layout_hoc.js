import React from "react";
import { connect } from "react-redux";
const LayoutHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const {history,location,...componentProps} = this.props;
            return  <div className='app-layout'>
                    {/* <Header history={history} location={location}/> */}
                    <div className='content'><WrappedComponent { ...componentProps }/></div>
                    {/* <Footer /> */}
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

export default LayoutHoc;