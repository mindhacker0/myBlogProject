//the component is to introduce author,and at present,it me.
import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./introduce.css";
const Introduce = ({ownerInfo}) => {
    console.log(ownerInfo);
    const linkList ={
        "github":"https://github.com/mindhacker0",
        "csdn":"https://blog.csdn.net/qq_33297737?spm=1001.2100.3001.5343",
        "mail":"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=983213779@qq.com"
    };
    function linkTo(type){//新的窗口打开链接
       window.open(linkList[type],"_blank");
    }
    const {name,addr,birth,caree,phone} = ownerInfo;
    return (<div className={styles.introduceWrap} style={{backgroundImage:"url('./static/images/introduce_bg.jpeg')"}}>
        <div className={styles.title}><span>博主个人简介</span></div>
        <div className={classNames(styles.name,"person-info")}><span>姓名：</span><span>{name}</span></div>
        <div className={classNames(styles.birth,"person-info")}><span>地址：</span><span>{addr}</span></div>
        <div className={classNames(styles.caree,"person-info")}><span>职业：</span><span>{caree}</span></div>
        <div className={classNames(styles.phone,"person-info")}><span>电话：</span><span>{phone}</span></div>
        <div className={styles.linksWrap}>
            <div className="contact-item" onClick={linkTo.bind(null,"github")}><span className="iconfont icon-github-fill"></span></div>
            <div className="contact-item" onClick={linkTo.bind(null,"csdn")}><span className="iconfont icon-csdn"></span></div>
            <div className="contact-item" onClick={linkTo.bind(null,"mail")}><span className="iconfont icon-mail"></span></div>
            <div className="contact-item"><span className="iconfont icon-wechat-fill"></span></div>
            <div className="contact-item"><span className="iconfont icon-QQ-circle-fill"></span></div>
        </div>
    </div>)
}

Introduce.propTypes = {
    
};

export default Introduce;