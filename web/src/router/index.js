
import React,{useLayoutEffect} from 'react';
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import { connect } from "react-redux";
import routeList from "./route.config";
import LayoutHoc from "../lib/layout_hoc";
import {getUserRoute} from "../reducers/user/constant";
const NotFound = function(){
  return <div>404</div>
};
const RouteApp = function({userRoute,getUserRoute}){
  useLayoutEffect(()=>{
    getUserRoute({});
  },[getUserRoute]);
  return <Router>
      <Routes>
        <Route path="/">
            {userRoute.map(({path,component,exact}, i) =>{
              let RenderComponent = LayoutHoc(routeList[component]); 
              return <Route key={`page_route${i}`} path={path} element={<RenderComponent />} exact={exact} />
            })}
            <Route element={<NotFound />}/>
        </Route>
      </Routes>
  </Router>
}
const mapStateToProps = (state) => {
  const {user:{userRoute}} = state;
  return {
    userRoute
  }
};
const mapDispatchToProps = (dispatch) => ({
  getUserRoute:(param)=>dispatch(getUserRoute(param))
});
export default connect(mapStateToProps, mapDispatchToProps)(RouteApp);