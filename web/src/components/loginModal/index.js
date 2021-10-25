import React,{useState} from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./loginmodal.css";
import ReactModal from "react-modal";
import LoginForm from "./loginForm";
import RegistForm from "./registForm";
import { userLogin } from "@/reducers/user/constant";
//登陆窗口
const LoginModal = ({isOpen,onClose,userLogin}) => {
    const [activeIndex,setIndex] = useState(0);
    function onActivateTab(index){
        console.log(index);
        setIndex(index);
    }
    return (<ReactModal
        isOpen={isOpen}
        className={styles.loginModal}
        contentLabel=""
        overlayClassName="modal-overlay"
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        >
        <div className={styles.modalContainer}>
            <div className={styles.closeBtn} onClick={onClose}><i className="iconfont icon-close-bold"></i></div>
            <div className={styles.tabContainer}>
                <div className={styles.tabHead}>
                    <div className={classNames(styles.tabTitle,{[styles.activeTab]:activeIndex===0})} onClick={()=>onActivateTab(0)}><span>登陆</span></div>
                    <div className={classNames(styles.tabTitle,{[styles.activeTab]:activeIndex===1})} onClick={()=>onActivateTab(1)}><span>注册</span></div>
                </div>
                <div className={styles.tabBody}>
                    {[<LoginForm userLogin={userLogin}/>,<RegistForm />][activeIndex]}
                </div>
            </div>
        </div>
    </ReactModal>)
}

LoginModal.propTypes = {
    
};

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    userLogin:(params)=>dispatch(userLogin(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);