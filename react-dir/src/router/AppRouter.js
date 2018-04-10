import React, { Component } from 'react'
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
import ViewOrderUser from '../components/ViewOrderUser';
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



export default class AppRouter extends Component {

    state = {
        jwt: localStorage.getItem('token'),
        cable: this.cable,
    }
    cable = ActionCable.createConsumer("ws://localhost:3000/cable", this.state.jwt)

    render() {
        console.log("my jwt",this.state.jwt)
        return (
            <ActionCableProvider cable={this.cable}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <PrivateRoute path="/" component={Home} exact={true} />
                            <PrivateRoute path="/friends" component={Friends} exact={true} />
                            <PrivateRoute path="/orders" component={Orders} exact={true}/>
                            <PrivateRoute path="/AllNotification" component={AllNotification} exact={true}/>
                            <PrivateRoute path="/orders/:id" component={ViewOrder}/>
                            <PrivateRoute path="/groups" component={Groups} exact={true} />
                            <PrivateRoute path="/groups/:name" component={Groups}/>
                            <PrivateRoute path="/add-order" component={AddOreder} />
                            <PrivateRoute path="/vieworderuser" component={ViewOrderUser} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register}/>
                            <Route path="/forgetpassword" component={Forgetpassword}/>
                            <Route  component={NotFound}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </ActionCableProvider>
        )
    }
}
