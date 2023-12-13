//公告信息栏
import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./notice.css";
import NoticeItem from "./noticeItem";
const Notice = ({noticeInfo}) => {
    console.log(noticeInfo);
    return (<div className={styles.noticeWrap}>
      <div className={styles.noticeTitle}><span>公告</span></div>
      {noticeInfo.map(({id,...porps})=><NoticeItem key={id} {...porps}/>)}
    </div>)
}

Notice.propTypes = {
    
};

export default Notice;