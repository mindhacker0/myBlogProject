import React,{useState} from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./loginform.css";
import { Input,Checkbox } from 'antd';
//登陆表单
const LoginModal = ({userLogin}) => {
    let [account,setAccount] = useState("");
    let [pwd,setPwd] = useState("");
    let [rmbPwd,setRmbPwd] = useState(true);//记住密码默认勾选
    function commitLogin(){
        let params = {account,pwd}
        userLogin({params});
    }
    return (<div className={styles.loginWrap}>
        <div className={styles.formWrap}>
            <div className={styles.formItem}>
                <Input style={{width:"240px"}} placeholder="手机号/邮箱" value={account} onChange={(e)=>setAccount(e.target.value)}/>
            </div>
            <div className={styles.formItem}>
                <Input style={{width:"240px"}} placeholder="密码" type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
            </div>
            <div className={styles.reserve} style={{width:"240px"}}><Checkbox checked={rmbPwd} onChange={(e)=>setRmbPwd(e.target.checked)}>记住密码</Checkbox></div>
        </div>
        <div className={styles.loginBtn} onClick={commitLogin}><span>登录</span></div>
    </div>)
}

LoginModal.propTypes = {
    
};

export default LoginModal;