import React,{useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./project-browser.css";
import Project from "./project";
//作品浏览
const ProjectBrowser = ({projectList}) => {
    return (<div>
        <div className={styles.PrjectInfo}>
            <div className={styles.labelName}><span>用户信息</span></div>
        </div>
        <div className={styles.ProjectFile}>
            <div className={styles.labelName}><span>项目文件</span></div>
            <div>
            {projectList.map(({id,...other})=><Project key={id} projectInfo={other}/>)}
            </div>
        </div>
    </div>)
}

ProjectBrowser.propTypes = {
    
};

const mapStateToProps = (state) => {
    const {projectList} = state.project;
    return {projectList}
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBrowser);