//公告信息栏
import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./notice.css";
const Notice = ({}) => {
    return (<div className={styles.userInfo}>
      
    </div>)
}

Notice.propTypes = {
    
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);