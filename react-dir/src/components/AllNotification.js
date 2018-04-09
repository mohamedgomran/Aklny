import React from 'react'
import { Confirm ,Table,Grid,Icon,Pagination,List,Image,Button } from 'semantic-ui-react'
import OrdersAPI from '../API/orders-api';
import UsersAPI from '../API/users-api';
import {ActionCable} from 'react-actioncable-provider'

let uuid = require('uuid-v4');
class AllNotification extends React.Component {

  constructor(props){
   super(props);
   this.state = {
     'joined' : [
       {'user': "George", 'img':"12.jpg",'Order':'lunch'},
  			{'user': "George", 'img':"12.jpg",'Order':'breakfast'},
  			{'user': "hagar", 'img':"12.jpg",'Order':'lunch'},
 		],

 		'invited' : [
 			{'user': "George", 'img':"12.jpg",'Order':'lunch'},
 			{'user': "omran", 'img':"12.jpg",'Order':'breakfast'},
 			{'user': "hassan", 'img':"12.jpg",'Order':'lunch'},
 			{'user': "hassan", 'img':"12.jpg",'Order':'breakfast'},
 			{'user': "hassan", 'img':"12.jpg",'Order':'lunch'},
 		],
   }
 }


  render() {
    return (


    <Grid centered >
      <Grid.Column centered='true' computer={9}>

        <List celled animated selection verticalAlign='middle'>




    {
      this.state.joined.length > 0 && this.state.joined.map((join)=>{
        return(

          <List.Item key={uuid()}>
          <List.Content floated='right'>
             <Button size='mini' color='teal'>Order</Button>
          </List.Content>
            <Image avatar src={join.img} />
            <List.Content>
            <List.Header>{join.user}</List.Header>
              has joined your {join.Order}
            </List.Content>
          </List.Item>
        )
      })
    }


        {
          this.state.invited.length > 0 && this.state.invited.map((invite)=>{
            return(

              <List.Item key={uuid()}>
                <List.Content floated='right'>
                   <Button size='mini' color='teal'>Join</Button>
                </List.Content>
                <Image avatar src={invite.img} />
                <List.Content>
                  <List.Header>{invite.user}</List.Header>
                    has invited you to his order
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
