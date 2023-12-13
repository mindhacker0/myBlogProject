import PropTypes from "prop-types";
import classNames from "classnames";
import React,{useEffect} from "react";
//power by @zpf
const MenuItem = function(props){//icon could be a classname of iconfont or JSX
  let {DefineDom,icon,title,bindEvent,level,index,active}=props;
  return <>{DefineDom?<DefineDom onClick={(e)=>{bindEvent(level,index,e);}}/>:<div onClick={(e)=>{bindEvent(level,index,e);}} className={classNames("menu-item",`menu-item-${level}`,active && "active")}>
    {typeof icon === "string"?<span className={`iconfont ${icon} menu-item-icon`}></span>:icon}
    <span className="menu-item-text">{title}</span>
  </div>}</>
}

const ComposeMenu = function(props){
  let {childrens,level,paths,index,onOpemMenu,...itemProps}=props;
  if(childrens.length>0){itemProps.bindEvent=onOpemMenu;}
  return <>
    {childrens.length>0?<div className="menu-wraper" role={`menu-${level}`}>
      <MenuItem {...itemProps} index={index} level={level} active={paths[level]===index}/>
      {paths[level]===index && <div className={classNames("sub-menu",`submenu-${level}`)}>
        {childrens.map((val,key)=>{
          return <ComposeMenu key={`menu-${level}-${key}`} onOpemMenu={onOpemMenu} {...val} level={level+1} index={key} paths={paths}/>
        })}
      </div>}
    </div>:<MenuItem {...itemProps} index={index} level={level} active={paths[level]===index}/>}
  </>
}

const Menu = function({menuConfig,menuPath,onOpemMenu,onClose}){
  let clickFn=null;
  console.log(menuPath);
  useEffect(()=>{
    document.body.addEventListener('click',clickFn=e=>{
      if(!e.path.map((val)=>{return val.className||""}).some((val)=>{return ~val.indexOf("menu-item");})) onClose(e);
    });
    return ()=>document.body.removeEventListener("click",clickFn);
  },[]);
  return <div className="menu-item-contanier">
    {menuConfig.map((val,key)=>{
      return <ComposeMenu {...val} key={"menu-warp-"+key} index={key} level={0} paths={menuPath} onOpemMenu={onOpemMenu}/>
    })}
  </div>
}

Menu.propTypes = {};

export default Menu;
