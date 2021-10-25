import React,{useState} from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./loginform.css";
import Input from '../../formElm/input';
//登陆表单
const LoginModal = ({userLogin}) => {
    let [account,setAccount] = useState("");
    let [pwd,setPwd] = useState("");
    function commitLogin(){
        let params = {account,pwd}
        userLogin({params});
    }
    return (<div className={styles.loginWrap}>
        <div className={styles.formWrap}>
            <div className={styles.formItem}>
                <Input placeholder="手机号/邮箱" value={account} onChange={(e)=>setAccount(e.target.value)}/>
            </div>
            <div className={styles.formItem}>
                <Input placeholder="密码" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
            </div>
        </div>
        <div className={styles.loginBtn} onClick={commitLogin}><span>登录</span></div>
    </div>)
}

LoginModal.propTypes = {
    
};

export default LoginModal;