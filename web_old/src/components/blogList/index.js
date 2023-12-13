import React from "react";
import Styles from "./blog-list.css";
import BlogItem from "../blogItem";
const BlogList = ({blogList}) => {
  console.log(blogList)
  return (
    <div className={Styles.blogListWrap}>
    {blogList.map((v)=><BlogItem key={v.id} itemInfo={v}/>)}
    </div>
  );
};

export default BlogList;
