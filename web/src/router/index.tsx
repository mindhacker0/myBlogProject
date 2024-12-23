import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routeList from "./route.config";
import LayoutHoc from "@/components/hoc/layout_hoc";
import { useAppSelector } from "@/store";

// Add this type definition
type RouteComponents = typeof routeList;
type ComponentKeys = keyof RouteComponents;

const NotFound = function(){
  return <div>404</div>
};

const RouteApp = function(){
  const userRoute = useAppSelector(state => state.user.userRoute);
  return <Router>
      <Routes>
        <Route path="/">
            {userRoute.map(({path,component,exact}, i) =>{
              let RenderComponent = LayoutHoc(routeList[component as ComponentKeys]); 
              return <Route key={`page_route${i}`} path={path} element={<RenderComponent />}/>
            })}
            <Route element={<NotFound />}/>
        </Route>
      </Routes>
  </Router>
}

export default RouteApp;