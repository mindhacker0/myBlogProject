import React,{useState} from 'react';
import styles from "./project.css";
import classNames from "classnames";
const iconStyle = {
    'js':styles.iconJs,
    'css':styles.iconCss,
    'html':styles.iconHtml,
};
const Project = ({projectInfo})=>{
    const {project_name,fileList} = projectInfo;
    return <div className={styles.projectItem}>
        <div className={styles.projectTitle}><span>{project_name}</span><span></span></div>
        <div>
        {fileList.map(({fileName,fileType,id})=><div key={id} className={styles.fileItem}>
            <span className={classNames('iconfont',`icon-${fileType}`,iconStyle[fileType])}></span>
            <span style={{marginLeft:"4px"}}>{fileName}</span>
        </div>)}
        </div>
    </div>
}

export default Project;