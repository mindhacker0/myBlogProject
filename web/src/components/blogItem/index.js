import React from "react";
import Styles from "./blog-item.css";
import classNames from "classnames";
import CountTip from "../countTip";
const BlogItem = ({itemInfo}) => {
  const {title,cover,describe,content,author,create_time,views,praise,comment} = itemInfo;
  let shortcut = describe || content.slice(0,160);
  return (
    <div className={Styles.blogItemWrap}>
        <div className={Styles.cover}><img src={cover}/></div>
        <div className={Styles.content}>
          <div className={Styles.title}><span>{title}</span></div>
          <div className={classNames("two-line",Styles.shortcut)}><span>{shortcut}</span></div>
          <div className={Styles.infoWrap}>
            <div><span>{author}</span><span style={{marginLeft:"10px"}}>{create_time}</span></div>
            <div className={Styles.blogData}>
              <CountTip name="views" data={views}/>
              <CountTip name="praise" data={praise}/>
              <CountTip name="comment" data={comment}/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default BlogItem;
