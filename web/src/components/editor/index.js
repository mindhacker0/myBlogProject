import React,{useEffect,useLayoutEffect,useRef,useState} from "react";
import styles from "./editor-wrap.css";
import MonacoEditor from "./monacoEditor";
const Editor = function({language,editorValue}){
    const editWrap = useRef();
    const [width,setWidth] = useState("800");
    const [height,setHeight] = useState("600");
    function initSize(){
        let p=document.querySelectorAll("[data-editorsize=true]")[0];
        if(p){
            setWidth(`${p.offsetWidth}`);
            setHeight(`${p.offsetHeight}`);
        }
    }
    useLayoutEffect(()=>{
        new ResizeObserver((entries) =>{
            initSize();
        }).observe(editWrap.current);
    },[]);
    return <div className={styles.editorWarp}>
        <MonacoEditor
        editorValue={editorValue}
        language={language}
        editorwarp={editWrap}
        width={width}
        height={height}
        />
    </div>
}
export default Editor;