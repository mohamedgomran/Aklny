import React from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Grid, Dropdown, Button, Label,Segment } from "semantic-ui-react";
import axios from 'axios';
import GroupsAPI from '../API/groups-api';
import GroupMember  from './GroupMembers';
import FileBase64 from 'react-file-base64';
import DOMAIN from '../API/domain';
var uuid = require('uuid-v4');

let headers = {
    'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

export default class AddOrder extends React.Component{
  constructor(props) {
    super(props);
		this.handleChangeRes = this.handleChangeRes.bind(this);
    }

    order = {
        res_name: "",
        order_for: "Breakfast",
        invited: [],
        menu: "",
    }

	state = {
			activeItem: '',
			invitedFriends: [],
			groups :[],
            publish:false,
            oid: '',
            friends:[]
	}

	componentDidMount(){
		this.getallFriends()
		GroupsAPI.getAllGroups((res)=>{
            if (res.success) {
                var groups = res.message.map((group)=>{
                    group = {key:uuid(), value:group.id, text: group.name}
                    return group
                    }
                )
                this.setState({groups:groups});
            }
		})
	}

    handleChangeRes(event) {
        this.order.res_name = event.target.value
    }

    getallFriends = ()=>{
         axios.get(`${DOMAIN}/users/friends`, {
             headers: headers
         }).then((response)=>{
                var friends = response.data.message.map((friend)=>{
                    friend = {key:uuid(), value:friend.id, text: friend.name, image: { avatar: true, src: friend.pic }}
                    return friend
                })
				 this.setState({friends:friends});
         }).catch((error)=>{
             console.log("error", error);
        })
    }

    addOrder = ()=>{
        this.setState( ()=>{
        axios.post(`${DOMAIN}/orders`,{
    		order_for:this.order.order_for,
            res_name: this.order.res_name,
    		invited : this.order.invited,
            menu: this.order.menu
        },
        {headers: headers }).then((response)=>{
            this.setState({
                publish: true,
                oid: response.data.message.id,
            })

        }).catch((error)=>{
            console.log("error", error);
        })
    })
    }

    getFiles = (file)=>{
        this.order.menu = file.base64
    }

    selectFriendHandle = (e, {value}) =>{
        value.forEach((id)=>{
            this.order.invited.indexOf(id)<0&&this.order.invited.push(id)
        })
    }

    selectGroupHandle = (e, {value})=>{
        if (value.length>0) {
            value.forEach((group)=>{
                GroupsAPI.listMembers(group, (res)=>{
                    res.message.forEach((member)=>{
                        this.order.invited.indexOf(member.id)<0&&this.order.invited.push(member.id)
                    })
                })
            })
        }
    }
    chooseMeal = (e, {value})=>{
        this.order.order_for = value
    }

    render = ()=>{
        if (this.state.publish) {
            return <Redirect to={`/orders/${this.state.oid}`} />
        }
        return (
            <Grid divided='vertically' centered>
                <h1>Add Order</h1>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                    <Form onSubmit={this.addOrder}>
                     <Form.Field>
                          <Dropdown
                            selection
                             options={[
                                { key: uuid(), text: 'Breakfast', value: 'Breakfast' },
                                { key: uuid(), text: 'Lunch', value: 'Lunch' }
                                ]}
                            placeholder='Choose an option' onChange={this.chooseMeal}
                          />
                     </Form.Field>
                     <Form.Field>
                        <input required type="text" name="restaurant" placeholder="Restaurant Name" onChange={this.handleChangeRes} value={this.state.res_name} />
                     </Form.Field>
                    <Form.Field>
                        {this.state.friends.length>0&&<Dropdown search placeholder='Invited friends' fluid multiple selection options={this.state.friends} onChange={this.selectFriendHandle}/>}
                    </Form.Field>
                    <Form.Field>
                        {this.state.groups.length>0&&<Dropdown search placeholder='Invited groups' fluid multiple selection options={this.state.groups} onChange={this.selectGroupHandle}/>}
                    </Form.Field>
                    <Form.Field>
                        <FileBase64 multiple={ false } onDone={ this.getFiles }/>
                    </Form.Field>
                    <Form.Field>
                        <Button basic color="green" size="large" floated="right">Publish</Button>
                    </Form.Field>

                </Form>
                </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
}
