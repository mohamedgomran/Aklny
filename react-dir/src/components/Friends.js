import React from 'react'
import   { Form, Label,Input, Button, Container, Header, Icon, Card, Image, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import axios from 'axios';
var uuid = require('uuid-v4');

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

                axios.post(`http://localhost:3000/users/friends/add`,{
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
                        // console.log("response",response);
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

    removeFriend = (e)=>{
				// console.log("removing"+e.target.value);
				axios.delete(`http://localhost:3000/users/friends/${e.target.value}`, {
					headers:{
                            'Content-Type': 'application/json',
                            'Authorization':"Bearer "+localStorage.getItem('token')
					}}).then((response)=>{
						this.getMyFriends();
					}).catch((error)=>{

					})
    }

    getMyFriends = ()=>{
        axios.get(`http://localhost:3000/users/friends`, {
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
                    <GridColumn centered="true" width={8}>
                        <GridRow>
                            <Header as='h3' icon>
                                <Icon name='users' circular/>
                                <Header.Content>Friends List</Header.Content>
                            </Header>
                        </GridRow>
                            <GridRow>
                                <GridColumn centered="true" width={5}>
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
                    </GridColumn>
                </GridRow>
                <GridRow >
                    <GridColumn centered="true" width={12}>
                            {
                                this.state.friends.length==0 && (<h1 align="center">Start adding your friends...</h1>)
                            }
                            <Card.Group className="six wide">
                            {
                                this.state.friends.map(friend=>{
                                    return (
                                        <Card  key={uuid()}>
                                            <Card.Content>
                                                <Image className="ui avatar image" floated='right' size='large' src={friend.pic}/>
                                                <Card.Header>{friend.name}</Card.Header>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Button className="ui button" size='mini' value={friend.id} basic color='red'onClick={this.removeFriend}>Remove</Button>
                                            </Card.Content>
                                        </Card>
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
