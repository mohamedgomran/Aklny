import React from 'react';
import { Form, Grid, Dropdown, Button, Icon, Label } from "semantic-ui-react";

export default class AddOrder extends React.Component{

    friends = [
            {
                name: 'Omran',
                id: 1,
                image:'https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg',
            },
            {
                name: 'Hassan',
                id: 2,
                image:'https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg',
            },
            {
                name: 'George',
                id: 3,
                image:'https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg',
            }

    ]

    state = {
        invitedFriends: []
    }

    submit = (e)=>{
        e.preventDefault();
        console.log(e.target.elements);
        
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
                <h1>Add Order</h1>
                <Grid.Row columns={2}>
                    <Grid.Column>
                    <Form onSubmit={this.submit}>

                    <Form.Field>
                        <select name="meal" className="ui search dropdown" placeholder="Select Meal">
                            <option value="1" >Lunch</option>
                            <option value="2" >Breakfast</option>    
                        </select>
                    </Form.Field>

                     <Form.Field>
                        <input type="text" name="restaurant" placeholder="Restaurant Name" />
                     </Form.Field>

                     <Form.Field>
                        <select name="invitedFriends" className="ui fluid dropdown" onChange={this.inviteFriend}>
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
                        <input type="file" name="menuImage" placeholder="Menu Image"/>
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