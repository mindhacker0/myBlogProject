import React,{useState} from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./project-browser.css";
//作品浏览
const ProjectBrowser = ({}) => {
    return (<div>
        <div className={styles.PrjectInfo}>
            <div className={styles.labelName}><span>用户信息</span></div>
        </div>
        <div className={styles.ProjectFile}>
            <div className={styles.labelName}><span>项目文件</span></div>
        </div>
    </div>)
}

ProjectBrowser.propTypes = {
    
};

const mapStateToProps = (state) => {
    console.log(state);
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBrowser);