import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import Friends from '../components/friends';
import Orders from '../components/Orders';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
const HeadLinks = ()=>(
    <NavLink to="/friends" activeClassName="active">Friends</NavLink>

)
const AppRouter =()=> (
    <BrowserRouter>
        <div>
            <HeadLinks/>
            <Switch>
                  <Route path="/" component={Home} exact={true}/>
                  <Route path="/friends" component={Friends}/>
                  <Route path="/Orders" component={Orders}/>
                  <Route path="/Login" component={Login}/>
                  <Route path="/Register" component={Register}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
