import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Friends from '../components/Friends';
import Orders from '../components/Orders';
import AllNotification from '../components/AllNotification';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Header from '../components/Header';
import Groups from '../components/Groups';
import AddOreder from '../components/AddOrder';
import Forgetpassword from '../components/Forgetpassword';
import ViewOrder from '../components/ViewOrder';
import { ActionCableProvider } from 'react-actioncable-provider'
import ActionCable from 'action-cable-react-jwt';
import NotFound from '../components/NotFound';

export const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
            localStorage.getItem('token')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
)

const jwt = localStorage.getItem('token') ;
const cable = ActionCable.createConsumer("ws://localhost:3000/cable", jwt)
const AppRouter =()=> (
    <ActionCableProvider cable={cable}>
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <PrivateRoute path="/" component={Home} exact={true}/>
                <PrivateRoute path="/friends" component={Friends} exact={true} />
                <PrivateRoute path="/orders" component={Orders} exact={true}/>
                <PrivateRoute path="/AllNotification" component={AllNotification} exact={true}/>
                <PrivateRoute path="/orders/:id" component={ViewOrder}/>
                <PrivateRoute path="/groups" component={Groups} exact={true} />
                <PrivateRoute path="/groups/:name" component={Groups}/>
                <Route path="/add-order" component={AddOreder} />

                {/* <Route path="/groups/:id" component={Groups}/>   check what to do either a new component or same one */}
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/forgetpassword" component={Forgetpassword}/>
                <Route  component={NotFound}/>

            </Switch>
        </div>
    </BrowserRouter>
    </ActionCableProvider>
)

export default AppRouter;
