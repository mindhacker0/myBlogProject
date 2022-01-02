import React from "react";
import styles from "../notice.css";
const NoticeItem = function({content,create_time,title,author}){
    return <div className={styles.homeContainer}>
       <div className={styles.contentTitle}><span>{title}</span></div>
       <div className={styles.contentWrap}><p>{content}</p></div>
       <div className={styles.detailWrap}>
           <div><span>作者：</span><span>{author}</span></div>
           <div><span>{create_time}</span></div>
       </div>
    </div>
}
export default NoticeItem;