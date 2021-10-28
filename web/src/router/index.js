
import React,{useLayoutEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import routeList from "./route.config";
import {getUserRoute} from "../reducers/user/constant";
const NotFound = function(){
  return <div>404</div>
};
const RouteApp = function({userRoute,getUserRoute}){
  useLayoutEffect(()=>{
    getUserRoute({});
  },[getUserRoute]);
  return <Router>
    <Route
      path="/"
      render={(props) => (
        <React.Fragment>
            <Switch>
                {userRoute.map(({path,component,exact}, i) => (
                  <Route key={`page_route${i}`} path={path} component={routeList[component]} exact={exact}/>
                ))}
                <Route component={NotFound} />
            </Switch>
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