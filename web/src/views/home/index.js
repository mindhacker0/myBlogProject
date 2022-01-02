//主界面入口
import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "/src/components/home";
const HomeWrap = (props) =>{
  return <Home  {...props}/>
};

HomeWrap.propTypes = {
    
};

const mapStateToProps = (state) => {
  const {homeBlogList,noticeInfo,ownerInfo} = state.home;
  return {
    ownerInfo,
    noticeInfo,
    homeBlogList
  }
};

const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrap);
