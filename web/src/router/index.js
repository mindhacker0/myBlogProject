
import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LayoutHoc from "../lib/layout_hoc";
import { connect } from "react-redux";
import routeList from "./route.config";
import {getUserRoute} from "../reducers/user/constant";
const NotFound = function(){
  return <div>404</div>
};
const RouteApp = ({userRoute,getUserRoute})=>{
  useEffect(()=>{
    getUserRoute({});
  },[getUserRoute]);
  const RouteComponent = (props)=>(<Switch>
    {userRoute.map(({path,component,exact}, i) => (
      <Route key={`page_route${i}`} path={path} component={routeList[component]} exact={exact}/>
    ))}
   <Route component={NotFound} />
 </Switch>);
 const LayoutPage = LayoutHoc(RouteComponent);
  return <Router>
    <Route
      path="/"
      render={(props) => (
        <React.Fragment>
          <LayoutPage {...props}/>
        </React.Fragment>
      )}
    />
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