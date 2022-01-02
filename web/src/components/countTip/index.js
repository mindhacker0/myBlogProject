import React from "react";
import Styles from "./count-tip.css";
const CountTip = ({name,data})=>{
    const domObject = {
        views:<div className={Styles.itemWrap}><span className="iconfont icon-eye-fill"></span><span className={Styles.count}>{data}</span></div>,
        praise:<div className={Styles.itemWrap}><span className="iconfont icon-praise_fill"></span><span className={Styles.count}>{data}</span></div>,
        comment:<div className={Styles.itemWrap}><span className="iconfont icon-pinglun"></span><span className={Styles.count}>{data}</span></div>
    } 
    return  domObject[name];
}

export default CountTip;