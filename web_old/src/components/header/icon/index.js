//图标
import React,{useEffect,useRef} from 'react';
const Icon = (props) => {
    let canvas = useRef(null);
    useEffect(()=>{
        if(canvas.current){
            let ctx = canvas.current.getContext("2d");
            ctx.font = "32px mengquruantang";
            ctx.strokeText('小灰灰的博客', 0, 36); 
        }
    },[]);
    return (<div style={{height:"60px"}}>
        <canvas ref={canvas} width="200" height="60"/>
    </div>)
}
export default Icon;