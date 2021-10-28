import PropTypes from "prop-types";
import React,{useState} from "react";
import styles from "./monacoedit.css";
import MonacoEditor from 'react-monaco-editor';
const MonacoEditorComponent = ({width = '800', height="600", editorwarp})=>{
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
    function editorDidMount(){
      console.log("monaco-editor mounted");
    }
    return (
    <div className={styles.edit} ref={editorwarp}>
        <MonacoEditor
        width={width}
        height={height}
        language="javascript"
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
