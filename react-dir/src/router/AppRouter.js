import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Friends from '../components/Friends';
import Orders from '../components/Orders';
import AllNotification from '../components/AllNotification';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Header from '../components/Header';
import Groups from '../components/Groups';
import AddOreder from '../components/AddOrder';
import GroupMembers from '../components/GroupMembers'
import Forgetpassword from '../components/Forgetpassword';
import ViewOrder from '../components/ViewOrder';
import NotFound from '../components/NotFound';


const AppRouter =()=> (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/friends" component={Friends} exact={true} />
                <Route path="/orders" component={Orders} exact={true}/>
                <Route path="/AllNotification" component={AllNotification} exact={true}/>
                <Route path="/orders/:id" component={ViewOrder}/>
                <Route path="/groups" component={Groups} exact={true} />
                <Route path="/groups/:name" component={Groups}/>
                <Route path="/add-order" component={AddOreder} />

                {/* <Route path="/groups/:id" component={Groups}/>   check what to do either a new component or same one */}
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/forgetpassword" component={Forgetpassword}/>
                <Route  component={NotFound}/>
                
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
