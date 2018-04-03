import React from 'react'
import { Input, Button, Container, Header, Icon, Card, Image } from 'semantic-ui-react'
var uuid = require('uuid-v4');

export default class Friends extends React.Component{
    emailRegex = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
    state = {
        friends:[],
        input: ""
    }

    addFriend = ()=>{
        {
            var friendsArr = this.state.friends.slice()
            // if(this.state.input.match(this.emailRegex)){
                friendsArr.push(this.state.input)
            // }
        }
            this.setState({friends:friendsArr}, ()=>document.getElementById('addFriend').value="")
    }

    handleInput = (e)=>{
        this.setState({input:e.target.value})
    }
    removeFriend = (e)=>{
        console.log("removing"+e.target);
        
    }

    render(){
        return (
            <div>
                <h1>Friends</h1>
                <div align="center">
                    <label htmlFor="addFriend" >Your Freind's Email</label>
                    <Input  validations={{matchRegexp:this.emailRegex}} id="addFriend" icon='user' iconPosition='left' placeholder='mail@example.com' value={this.state.input} onChange={this.handleInput} />  
                    <Button secondary onClick={this.addFriend}>ADD</Button>
                </div>
                <div>
                    <Container fluid>
                        <Header as='h3' icon>
                            <Icon name='users' circular/>
                            <Header.Content>Friends List</Header.Content>
                        </Header>
                        {
                            this.state.friends.length==0 && (<h1 align="center">Start adding your friends...</h1>)
                        }
                        <Card.Group className="eight wide">
                        {
                            this.state.friends.map(friend=>{
                                return (
                                    <Card  key={uuid()}>
                                        <Card.Content>
                                            <Image className="ui avatar image" floated='right' size='mini' src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg'/>
                                            <Card.Header>{friend}</Card.Header>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button className="ui button" size='mini' basic color='red'onClick={this.removeFriend}>Remove</Button>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        }
                        </Card.Group>  
                    </Container>
                </div>
            </div>
        );
    }
}
// const AddFriendToGroup = () => (
// )

// export default Friends