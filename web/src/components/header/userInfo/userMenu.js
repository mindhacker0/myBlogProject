import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./userInfo.css";

const UserMenu = ({userInfo})=>{
    const {avatar,user_name} = userInfo;
    return <div className={styles.userMenu}>
        <div className={styles.userIcon}>
            {avatar?<div><img src={avatar}/></div>:<div className={classNames("iconfont icon-user-filling",styles.defaultIcon)}></div>}
        </div>
        <div className={styles.userName}>
           <span>{user_name}</span>
        </div>
    </div>
}
export default UserMenu;