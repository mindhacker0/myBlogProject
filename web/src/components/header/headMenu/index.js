//导航栏菜单
import React,{useEffect,useRef,useState} from 'react';
import classNames from "classnames";
import styles from "./head-menu.css";
const HeadMenu = (props) => {
    let [pathNow,setPathNow] = useState(window.location.pathname);
    useEffect(()=>{
        
    },[]);
    let menuList = useRef([{
        name:"首页",
        path:"/",
        id:window.UUID()
    },{
        name:"原创博客",
        path:"/myblogs",
        id:window.UUID()
    },{
        name:"个人作品",
        path:"/myproducts",
        id:window.UUID()
    },{
        name:"好文推荐",
        path:"/recommands",
        id:window.UUID()
    }]);
    console.log(menuList);
    function switchRoute(path){
        console.log("goto",path);
        
    }
    return (<div className={styles.menuWrap}>
    {menuList.current.map(({name,path,id})=>
    <div key={id} onClick={switchRoute.bind(this,path)} className={classNames(styles.menuItem,pathNow===path && styles.menuActive)}><span>{name}</span></div>
    )}
    </div>)
}
export default HeadMenu;