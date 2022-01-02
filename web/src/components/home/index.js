import React,{useEffect} from "react";
import styles from "./home.css";
import Notice from "./notice";
import BlogList from "../blogList";
import Introduce from "./introduce";
const Home = function({ownerInfo,noticeInfo,homeBlogList}){
    useEffect(()=>{
        
    },[]);
    return <div className={styles.homeContainer}>
        <div className={styles.tableWrap}>
            <div className={styles.leftRow}>
                <div className={styles.noticeBox}><Notice noticeInfo={noticeInfo}/></div>
                <div className={styles.hotSpot}>
                    <div className={styles.blockTitle}><span>热门推荐</span></div>
                    <BlogList blogList={homeBlogList}/>
                </div>
            </div>
            <div className={styles.rightRow}>
                <div className={styles.noticeBox}><Introduce ownerInfo={ownerInfo}/></div>
            </div>
        </div>
    </div>
}
export default Home;