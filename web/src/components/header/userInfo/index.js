//导航栏
import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./userInfo.css";
import { openModal } from "@/reducers/modal/constant";
import { getUserInfo } from "@/reducers/user/constant";
import UserMenu from "./userMenu";
const UserInfo = ({isLogin,openModal,getUserInfo,userInfo}) => {
    useEffect(()=>{
      if(localStorage.getItem("token") && isLogin===false){//通过token判断当前登录状态
        getUserInfo();
      }
    },[isLogin]);
    return (<div className={styles.userInfo}>
        {isLogin?<UserMenu userInfo={userInfo}/>:
        <div className={classNames(styles.loginButton,"pretty-button")} onClick={openModal.bind(this,"loginModal")}>
         <span>登录</span>
        </div>}
    </div>)
}

UserInfo.propTypes = {
    
};

const mapStateToProps = (state) => {
  const {isLogin,userInfo} = state.user;
  return {
    isLogin,
    userInfo
  }
};

const mapDispatchToProps = (dispatch) => ({
  openModal:(modalName)=>dispatch(openModal({modalName})),
  getUserInfo:()=>dispatch(getUserInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);