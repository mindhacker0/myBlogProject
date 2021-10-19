import React,{useEffect} from "react";
import styles from "./home.css";
const Home = function({gameTable,getGameTable}){
    useEffect(()=>{
        getGameTable({});
    },[getGameTable]);
    return <div>
        <div><span>游戏练习</span></div>
        <div><span>创作</span></div>
        <div className={styles.tableWrap}>{
            gameTable.map(({name,icon},key)=><div key={`game-item-${key}`} className={styles.tableItem}>
                <img src={`${process.env.baseUrl}${icon}`}/>
                <div className={styles.tableItemTitle}><span>{name}</span></div>
            </div>)
        }</div>
    </div>
}
export default Home;