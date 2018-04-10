import React from 'react';
import { Form, Grid, Dropdown, Button, Icon, Label,Segment } from "semantic-ui-react";
import axios from 'axios';
import GroupsAPI from '../API/groups-api';
import GroupMember  from './GroupMembers';
import FileBase64 from 'react-file-base64';
var uuid = require('uuid-v4');

let headers = {
    'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem('token')
    }


export default class AddOrder extends React.Component{

  constructor(props) {
    super(props);
		this.handleChangeRes = this.handleChangeRes.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
    }

	state = {
			activeItem: '',
			status: '',
			res_name:'',
			order_for:'Breakfast',
			invitedFriends: [],
			invited:[],
			friends : [] ,
			groups :[],
			members :[],
            publish:true

	}

	componentDidMount(){
		this.getallFriends()
		GroupsAPI.getAllGroups((res)=>{
			this.setState({groups:res})
			console.log(this.state.groups);
		})
	}

	handleItemClick = (e, { key }) => {
		console.log("My Active Item is ",key)
		this.state.activeItem = key
		GroupsAPI.listMembers(key, (res)=>{
			if (res.success) {
				console.log(res.message)
				this.setState(prevState=>{
						return {groupMembers:res.message}
				})
			}
        })

	}

    submit = (e)=>{
        e.preventDefault();
        console.log(e.target.elements);
    }

    handleChangeType(event) {
      this.setState({'order_for': event.target.value});
    }


    handleChangeRes(event) {
      this.setState({'res_name': event.target.value});
    }


    handleChangeName(event) {
      this.setState({user: event.target.value});
    }

    handleChangeimage(event) {
      console.log('image',event.target.files[0]);
    }

    getallFriends = ()=>{
         axios.get(`http://localhost:3000/users/friends`, {
             headers: headers
         }).then((response)=>{
             console.log(response);
						 this.setState({friends:response.data.message});
						 console.log(this.state.groups);
         }).catch((error)=>{
             console.log("error", error);
        })
  }

    addOrder = ()=>{
        this.setState( ()=>{
        axios.post(`http://localhost:3000/orders`,{
    		order_for:this.state.order_for,
            res_name: this.state.res_name,
    		invited : this.state.invited,
            menu: this.state.menu
        },
        {headers: headers }).then((response)=>{
            console.log("response",response);

        }).catch((error)=>{
            console.log("error", error);
    		console.log(this.user);
        })
    })
    console.log(this.state.invited);
    }


    inviteFriend = (e)=>{
        console.log("befor",this.state.invitedFriends)
        let invitedFriendsArr = this.state.invitedFriends.slice();
        let invite = this.state.invited.slice();
        this.state.friends.forEach(friend=>{
            if(e.target.value == friend.id){
			console.log(e.target.value);
				if(invitedFriendsArr.indexOf(e.target.value) == -1){
					let invitedFriend = friend;
					invitedFriendsArr.push(invitedFriend);
					invite.push(invitedFriend.id);
					console.log(invitedFriend.id);
				}
            }
        })
        this.setState({invitedFriends:invitedFriendsArr})
	    this.setState({invited:invite})
		console.log(this.state.invited);
    }


    notInvite = (friendId)=>{
        let newInvitedArr = [];
        this.state.invitedFriends.forEach(invitedFriend=>{
            if(friendId != invitedFriend.id){
                newInvitedArr.push(invitedFriend);
            }
        })
        this.setState({invitedFriends:newInvitedArr}, ()=>{
            console.log(this.state.invitedFriends);
        })
    }

    getFiles = (file)=>{
        console.log(file.base64)
        this.setState({ menu: file.base64 })
    }

    render = ()=>{
        return (
            <Grid divided='vertically' centered>
                <h1>Add Order</h1>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                    <Form onSubmit={this.addOrder}>

                    <Form.Field onChange={this.handleChangeType} value={this.state.order_for} id ='add_order'>
                        <select name="meal" className="ui search dropdown" placeholder="Select Meal">
                            <option value="Breakfast" >Breakfast</option>
                            <option value="Lunch" >Lunch</option>
                        </select>
                    </Form.Field>

                     <Form.Field>
                        <input required type="text" name="restaurant" placeholder="Restaurant Name" onChange={this.handleChangeRes} value={this.state.res_name} />
                     </Form.Field>

                     <Form.Field>
                        <select name="invitedFriends" className="ui fluid dropdown" onChange={this.inviteFriend} value={this.state.user}>
                            <option value="">Invite Friend</option>
                        {
                            this.state.friends.map(friend =>{
                                return(
                                    <option key={friend.id} value={friend.id}>{friend.name}</option>
                                )
                            })
                        }
						{
							this.state.groups.length>0&&this.state.groups.map(group =>{
								return(
									<option key={group.id} value={group.id} onClick={this.handleItemClick} >{group.name}</option>
								)
							})
						}
						</select>
                    </Form.Field>
                    <Form.Field>
                        <FileBase64 multiple={ false } onDone={ this.getFiles }/>
                    </Form.Field>
                    <Button basic color="green" size="large" floated="left">Publish</Button>
                </Form>
                </Grid.Column>

                   <Grid.Column width={6}>
                    <h4>Invited Friends</h4>
                    <div>
                        {
                            this.state.invitedFriends.map(invitedFriend =>{
                                return(
                                     <Label key={invitedFriend.id} size="huge" image>
                                        <img src={invitedFriend.pic} alt={invitedFriend.name}/>
                                        {invitedFriend.name}
                                        
                                        <Icon name="delete" onClick={this.notInvite.bind(this,invitedFriend.id)}/>
                                     </Label>
                                )
                            })
                        }
						{this.props.match.params.key && <Segment>
                            <GroupMember groupId={this.state.activeItem} />
                            </Segment>
                        }
                    </div>
                   </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
