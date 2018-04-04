import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Friends from '../components/Friends';
import Orders from '../components/Orders';
import Home from '../components/Home';
import Header from '../components/Header';
import Groups from '../components/Groups';

const AppRouter =()=> (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/friends" component={Friends}/>
                <Route path="/orders" component={Orders} exact={true}/>
                <Route path="/orders/:id" component={Orders}/>
                <Route path="/groups" component={Groups} exact={true} />
                <Route path="/groups/:name" component={Groups}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
