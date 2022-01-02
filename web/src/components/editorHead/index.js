import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Styles from './editor-head.css';
//编辑器头部栏
const EditorHead = (props)=>{
    return <div>editor head</div>
}

EditorHead.propTypes = {
    
};

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorHead);