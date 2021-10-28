//导航栏
import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./header.css";
import Icon from "./icon";
import UserInfo from "./userInfo";
import HeadMenu from "./headMenu";
const Header = (props) => {
    
    return (<div className={styles.headWrap}>
        <div className={styles.headContainer}>
            <div className={styles.icon}><Icon /></div>
            <div className={styles.menu}><HeadMenu /></div>
            <div className={styles.rightMenu}>
                <div className={styles.userInfo}><UserInfo /></div>
                <div className={"pretty-button"}><span>创作</span></div>
            </div>
        </div>
        
    </div>)
}

Header.propTypes = {
    
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
