//图标
import React,{useEffect,useRef} from 'react';
const Icon = (props) => {
    let canvas = useRef(null);
    useEffect(()=>{
        if(canvas.current){
            let image = new Image;
            let ctx = canvas.current.getContext("2d");
            image.src = "./static/images/game-icon.jpeg";
            image.onload = ()=>{
                ctx.drawImage(image,10,5,image.width/10,image.height/10);
            }
        }
    },[]);
    return (<div>
        <canvas ref={canvas} width="100" height="60"/>
    </div>)
}
export default Icon;