import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import Friends from '../components/Friends';
import Orders from '../components/Orders';
import Home from '../components/Home';
import Header from '../components/Header';

const AppRouter =()=> (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/friends" component={Friends}/>
                <Route path="/orders" component={Orders}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
