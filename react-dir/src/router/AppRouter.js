import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import Friends from '../components/Friends';
import Home from '../components/Home';
import Header from '../components/Header';

const AppRouter =()=> (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/friends" component={Friends}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;