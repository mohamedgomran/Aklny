import React from 'react';
import { Form, Grid, Dropdown, Button, Icon, Label } from "semantic-ui-react";
import axios from 'axios';

var uuid = require('uuid-v4');


export default class AddOrder extends React.Component{

  constructor(props) {
    super(props);
  this.getallFriends();

  }

  userId = this.props.match.params.id;

    friends = []

    state = {
        data : '',
        type: '',
        res_name:'',
        user:'',
        image:'',
        invitedFriends: []
    }

    submit = (e)=>{
        e.preventDefault();
        console.log(e.target.elements);

    }

    handleChangeType(event) {
      this.setState({'type': event.target.value});
    }


    handleChangeRes(event) {
      this.setState({'res_name': event.target.value});

    }


    handleChangeName(event) {
      this.setState({'user': event.target.value});
    }

    handleChangeimage(event) {
      console.log('image',event.target.files[0]);
    }

    getallFriends = ()=>{
         axios.get(`http://localhost:3000/users/${this.userId}/friends`, {
             headers:{
                       'Content-Type': 'application/json'
             }
         }).then((response)=>{
             console.log(response);
             this.state.friends = response.data.message;

         }).catch((error)=>{
             console.log("error", error);

        })

  }

  addOrder = ()=>{
    this.setState( ()=>{

        axios.post(`http://localhost:3000/users/orders`,{
            'type': this.state.type,
            'user': this.state.userId,
            'res_name': this.state.res_name,
            'image': this.state.image,
        },
        {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then((response)=>{
            console.log("response",response);
        }).catch((error)=>{
            console.log("error", error);
        })

    })

  }


    inviteFriend = (e)=>{
        console.log("befor",this.state.invitedFriends)
            let invitedFriendsArr = this.state.invitedFriends.slice();
            this.friends.forEach(friend=>{
                if(e.target.value == friend.id){
                let invitedFriend = friend;
                invitedFriendsArr.push(invitedFriend);
                }
            })
            this.setState({invitedFriends:invitedFriendsArr})
    }

    notInvite = (e)=>{
        let newInvitedArr = [];
        this.state.invitedFriends.forEach(invitedFriend=>{
            if(e.target.value != invitedFriend.id){
                newInvitedArr.push(invitedFriend);
            }
        })
        this.setState({invitedFriends:newInvitedArr}, ()=>{
            console.log(this.state.invitedFriends);
        })


    }

    render = ()=>{
        return (
            <Grid divided='vertically'>

            {this.getallFriends()}
                <h1>Add Order</h1>
                <Grid.Row columns={2}>
                    <Grid.Column>
                    <Form onSubmit={this.addOrder}>

                    <Form.Field onChange={this.handleChangeType} value={this.state.type} id ='add_order'>
                        <select name="meal" className="ui search dropdown" placeholder="Select Meal">
                            <option value="1" >Lunch</option>
                            <option value="2" >Breakfast</option>
                        </select>
                    </Form.Field>

                     <Form.Field>
                        <input type="text" name="restaurant" placeholder="Restaurant Name" onChange={this.handleChangeRes} value={this.state.res_name} />
                     </Form.Field>

                     <Form.Field>
                        <select name="invitedFriends" className="ui fluid dropdown" onChange={this.inviteFriend} value={this.state.res_name}>
                            <option value="">Invite Friend</option>
                            {
                                this.friends.map(friend =>{
                                    return(
                                        <option key={friend.id} value={friend.id}>{friend.name}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Field>

                    <Form.Field>
                        <input type="file" name="menuImage" placeholder="Menu Image" value={this.state.image} onChange={this.handleChangeimage}/>
                    </Form.Field>
                    <Button basic color="green" size="large" floated="right">Puplish</Button>
                </Form>

                    </Grid.Column>


                   <Grid.Column>
                    <h4>Invited Friends</h4>
                    <div>
                        {
                            this.state.invitedFriends.map(invitedFriend =>{
                                return(
                                     <Label key={invitedFriend.id} size="huge" image>
                                        <img src={invitedFriend.image}/>
                                        {invitedFriend.name}
                                        <Button size="mini" value={invitedFriend.id} name="delete" onClick={this.notInvite} circular/>
                                        {/*<Button size="mini" value={invitedFriend.id} name="delete" onClick={this.notInvite} circular>
                                            <i className="icon close"></i>
                                </Button>*/}

                                     </Label>
                                )
                            })
                        }
                    </div>
                   </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
