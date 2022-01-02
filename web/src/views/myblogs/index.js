//博客列表
import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BlogList from "../../components/blogList";
import BlogCatalog from "../../components/blogCatalog";
const Myblogs = (props) =>{
    
    return <div>
        <div>
          <div></div>
        </div>
        <div>
          <div>
            <div><span>按发布时间</span></div>
            <div><span>按浏览次数</span></div>
          </div>
          <div><BlogList blogList={[]}/></div>
        </div>
        
    </div>
};

Myblogs.propTypes = {
    
};

const mapStateToProps = (state) => {
  return {
    
  }
};

const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(Myblogs);
