import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Editor from "/src/components/editor";
import EditorMenu from "/src/components/editorMenu";
import ProjectBrowser from "/src/components/projectBrowser";
import styles from "./editor.css";
//编辑器页面
const EditorWrap = ({editorValue,language}) =>{
    return <div className={styles.editorView}>
      {/* 菜单容器 */}
      <div className={styles.menuBar}><EditorMenu /></div>
      <div className={styles.bodyContent}>
          {/* 项目列表 */}
          <div className={styles.projectWrap}>
               <ProjectBrowser />
          </div>
          {/* 编辑器，打开文件或编辑 */}
          <div className={styles.editorWrap} data-editorsize>
                <div></div>
                <div>
                    <Editor editorValue={editorValue} language={language}/>
                </div>
          </div>
          {/* 项目预览 */}
          <div className={styles.previewWrap}>
              
          </div>
      </div>
    </div>
}
 

EditorWrap.propTypes = {
    
};

const mapStateToProps = (state) => {
    console.log(state);
    const {value,language} = state.editor;
    return {
        editorValue:value,
        language
    }
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorWrap);
