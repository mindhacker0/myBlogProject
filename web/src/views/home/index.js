//主界面入口
import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "/src/components/home";
import {getGameTable} from "/src/reducers/home/constant";
const HomeWrap = (props) => (
  <Home  {...props}/>
);

HomeWrap.propTypes = {
    
};

const mapStateToProps = (state) => {
  const {home:{gameTable}} = state;
  return {
    gameTable
  }
};

const mapDispatchToProps = (dispatch) => ({
    getGameTable:(params)=>dispatch(getGameTable(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrap);
