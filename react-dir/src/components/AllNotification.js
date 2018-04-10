import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { Confirm, Table, Grid, Icon, Pagination, List, Image, Button, Divider } from 'semantic-ui-react'
import OrdersAPI from '../API/orders-api';
import UsersAPI from '../API/users-api';
import {ActionCable} from 'react-actioncable-provider'

let uuid = require('uuid-v4');

class AllNotification extends React.Component {

  state = {
        join_notif:[],
        invite_notif: [],
        join: false,
   }

  constructor(props){
   super(props);
   
}

  onReceived(notif) {
  console.log(notif)
  this.setState({
    join_notif: notif.message.join_notif,
    invite_notif: notif.message.invite_notif
  })
}

join = (oid) => {
  console.log(oid)
  OrdersAPI.joinOrder(oid, (response) => {
      console.log(response);
    })
  this.setState({join:oid})
}

  componentDidMount() {
    UsersAPI.getMyNotifications((res) => {
      console.log("my notifications",res);
      this.setState({
        join_notif: res.message.join_notif,
        invite_notif: res.message.invite_notif,
      });
  })
    
}

  render() {

    if(this.state.join) {
      return( <Redirect to={`/orders/${this.state.join}`} />)
    }

    return (
    <Grid centered >
      <ActionCable ref='MyNotifications' channel={{channel: 'MyNotificationsChannel'}} onReceived={this.onReceived.bind(this)} />			    
      <Grid.Column centered='true' computer={9}>
        <List celled animated selection verticalAlign='middle'>
          <List.Header color='teal'>
            <h2>My Orders</h2>
            <Divider />
          </List.Header>
          {
            this.state.join_notif && this.state.join_notif.map((invited)=>{
            return(
                <List.Item key={uuid()}>
                  <List.Content floated='right'>
                    <Button as={Link} to={`/orders/${invited.order_id}`} size='large' color='teal'>View</Button>
                  </List.Content>
                  <Image avatar src={invited.invited.pic} />                  
                  <List.Content>
                    <h3>
                      <List.Header>
                        {invited.invited.name}
                      </List.Header>
                      has joined your {invited.order_for}
                    </h3>
                  </List.Content>
                  
                </List.Item>
            )            
            })
          }
          <Divider />
          <List.Header color='teal'>
            <h2>Invitations</h2>
            <Divider />
          </List.Header>
          {
            this.state.invite_notif && this.state.invite_notif.map((invite)=>{
              return(
                  <List.Item key={uuid()}>
                    <List.Content floated='right'>
                      <Button onClick={this.join.bind(this,invite.order_id)} size='large' color='teal'>Join</Button>
                    </List.Content>
                    <Image avatar src={invite.host.pic} />
                    <List.Content>
                      <h3>
                        <List.Header>
                          {invite.host.name}
                        </List.Header>
                        has invited you to his {invite.order_for} from {invite.res_name}
                      </h3>
                    </List.Content>
                  </List.Item>
              )
            })
          }

        </List>
      </Grid.Column>
    </Grid>
    );
  }
}

export default AllNotification;
