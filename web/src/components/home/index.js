import React,{useEffect} from "react";
import styles from "./home.css";
import Notice from "./notice";
const Home = function({}){
    useEffect(()=>{
        
    },[]);
    return <div className={styles.homeContainer}>
        <div className={styles.tableWrap}>
            <div>
                <Notice />
            </div>
        </div>
    </div>
}
export default Home;