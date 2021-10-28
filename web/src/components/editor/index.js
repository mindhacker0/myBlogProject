import React,{useEffect,useLayoutEffect,useRef,useState} from "react";
import styles from "./editor-wrap.css";
import MonacoEditor from "./monacoEditor";
const Editor = function({}){
    const editWrap = useRef();
    const [width,setWidth] = useState("800");
    const [height,setHeight] = useState("600");
    useLayoutEffect(()=>{
        console.log(editWrap);
        new ResizeObserver((entries) =>{
            
        }).observe(editWrap.current); // or this.header, or anything else
    },[]);
    return <div className={styles.editorWarp}>
        <div >
            <MonacoEditor
            editorwarp={editWrap}
            width={width}
            height={height}
            />
        </div>
    </div>
}
export default Editor;