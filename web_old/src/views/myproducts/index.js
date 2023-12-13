//我的作品
import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const MyProducts = (props) =>{
    return <div>
       我的作品
    </div>
};

MyProducts.propTypes = {
    
};

const mapStateToProps = (state) => {
  return {
    
  }
};

const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProducts);
