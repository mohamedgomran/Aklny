import React from 'react'
import   { Form, Label,Input, Header, Icon, Card, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import axios from 'axios';
import DOMAIN from '../API/domain';

export default class Friends extends React.Component{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    userId = this.props.match.params.id;
    state = {
        friends:[],
        input: "",
        groupError: "",
		}

		constructor(props){
			super(props);
			this.getMyFriends()
		}

    addFriend = ()=>{
        this.setState({input:document.getElementById("friendEmail").value}, ()=>{
            if (this.emailRegex.test(this.state.input)){

                axios.post(`${DOMAIN}/users/friends/add`,{
                        'email': this.state.input
                },
                {headers: {
                        'Content-Type': 'application/json',
                        'Authorization':"Bearer "+localStorage.getItem('token')
                }}).then((response)=>{
                    if(response.data.success){
                        this.getMyFriends();
                        console.log("friend added");
                    }else{
                        if(response.data.message === "already a friend"){
                            this.setState({groupError:"already a friend"})
                        }else if(response.data.message === "Friend Not found"){
                            this.setState({groupError:"Friend Not found"})
                        }
                    }
                }).catch((error)=>{
                        console.log("error", error);
                })
            }
        })
    }

    handelInputChange = (e)=>{
        this.setState({input:e.target.value})
        this.setState({groupError:""})
    }

    removeFriend = (friendId)=>{
				axios.delete(`${DOMAIN}/users/friends/${friendId}`, {
					headers:{
                            'Content-Type': 'application/json',
                            'Authorization':"Bearer "+localStorage.getItem('token')
					}}).then((response)=>{
						this.getMyFriends();
					}).catch((error)=>{
				})
    }

    getMyFriends = ()=>{
        axios.get(`${DOMAIN}/users/friends`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+localStorage.getItem('token')
            }
        }).then((response)=>{
            console.log("friends",response.data.message)
            this.setState({friends:response.data.message});

        }).catch((error)=>{
            console.log("error", error);

				})
				this.render()
    }

    render(){
        return (
            <Grid centered>
                <GridRow >
                    <GridColumn centered="true" width={2}>
                            <Header as='h3' icon>
                                <Icon name='users' circular/>
                                <Header.Content>Friends List</Header.Content>
                            </Header>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn centered="true" width={4}>
                        <Form>
                            <Form.Group>
                                <Form.Field>
                                    <Input id="friendEmail" icon='user' iconPosition='left' placeholder='mail@example.com' onChange={this.handelInputChange} />
                                    {this.state.groupError&&<Label basic color='red' pointing>{this.state.groupError}</Label>}
                                </Form.Field>
                                <Form.Button secondary onClick={this.addFriend}>ADD</Form.Button>
                            </Form.Group>
                        </Form>
                    </GridColumn>
                </GridRow>
                <GridRow >
                    <GridColumn centered="true" width={12}>
                            {
                                this.state.friends.length===0 && (<h1 align="center">Start adding your friends...</h1>)
                            }
                            <Card.Group className="six wide">
                            {
                                this.state.friends.map(friend=>{
                                    return (
                                        <Label key={friend.id} size="massive" image>
                                        <img src={friend.pic} alt={friend.name}/>
                                        {friend.name}
                                        
                                        <Icon name="delete" onClick={this.removeFriend.bind(this,friend.id)}/>
                                     </Label>
                                        
                                    )
                                })
                            }
                            </Card.Group>
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}
