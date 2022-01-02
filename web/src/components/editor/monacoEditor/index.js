import PropTypes from "prop-types";
import React,{useState,useEffect} from "react";
import styles from "./monacoedit.css";
import MonacoEditor from 'react-monaco-editor';
const MonacoEditorComponent = ({
  width = "800", 
  height = "600", 
  editorwarp, 
  language,
  editorValue
})=>{
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      cursorStyle: "line",
      automaticLayout: false,
    };
    let [value,setValue] = useState("");
    function onChange(value){
      setValue(value);
    }
    function editorDidMount(editor,monaco){//编辑器完成挂载
      console.log("monaco-editor mounted",monaco);
    }
    useEffect(()=>{
      setValue(editorValue);
    },[editorValue]);
    return (
    <div className={styles.edit} ref={editorwarp}>
        <MonacoEditor
        width={width}
        height={height}
        language={language}
        theme="vs-dark"
        value={value}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </div>
    );
}

MonacoEditorComponent.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  mode: PropTypes.string,
  theme: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  componentRef: PropTypes.func,
};

MonacoEditorComponent.defaultProps = {};

export default MonacoEditorComponent;
