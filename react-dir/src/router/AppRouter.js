import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import Friends from '../components/friends';
import Home from '../components/Home';

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
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;