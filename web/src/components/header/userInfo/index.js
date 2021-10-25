//导航栏
import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./userInfo.css";
import { openModal } from "@/reducers/modal/constant";
const UserInfo = ({isLogin,openModal}) => {
    
    return (<div className={styles.userInfo}>
       {isLogin?<div>已登录</div>:<div className={classNames(styles.loginButton,"pretty-button")} onClick={openModal.bind(this,"loginModal")}>
         <span>登录</span>
        </div>}
    </div>)
}

UserInfo.propTypes = {
    
};

const mapStateToProps = (state) => {
  const {isLogin} = state.user;
  return {
    isLogin
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModal:(modalName)=>dispatch(openModal({modalName}))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);