import React from 'react';
import GridRow, { Input, Button, Container, Header, Icon, Card, Image, Grid, Segment, Tab } from 'semantic-ui-react'
import GroupsAPI from '../API/groups-api';
var uuid = require('uuid-v4');

export default class GroupMember extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newFriend:null,
            groupMembers: [],
        }
        console.log("my params are",this.props)
    }

    componentWillReceiveProps(prop){
        GroupsAPI.listMembers(prop.groupId, (res)=>{
            if (res.success) {
                console.log(res.message)
                this.setState(prevState=>{
                    return {groupMembers:res.message}
                })
            }
        })
    }

    handleChange = (e) => {
        console.log(e.target.value)
        let NewFriend = e.target.value;
        this.setState(() => {
            return {
                newFriend: NewFriend,
            }
        })
    }
    addFriend = (e) => {
        console.log("New Friend",this.state.newFriend)
        this.setState((prevState) => {
            let newFriend = prevState.groupMembers.push(this.state.newFriend)
            console.log(newFriend)
            return {
                groupMembers: prevState.groupMembers
            };
        });

    }

    removeFriend = (e)=>{
        console.log("remove friend");
        let deletedFriend = e.target.value;
        let delIndex = null;
        let myNewArray = this.state.groupMembers
        this.state.groupMembers.forEach((member,index) => {
            if (member == deletedFriend) {
                console.log(delIndex);
                myNewArray.splice(delIndex,1)
                this.setState((prevState) => {
                    return {
                        groupMembers: myNewArray
                    }
                })
            }
           
            
        })

        
    }

    render() {
        return(
            <Grid>
                <Grid.Row centered>
                    <Input validations={{matchRegexp:this.groupRegex}} onChange={this.handleChange} id="addGroup" icon='user' iconPosition='left' placeholder="Friend's Name" />  
                    <Button secondary onClick={this.addFriend}>ADD</Button>
                </Grid.Row>

                <Grid.Row centered>
                    {
                        this.state.groupMembers.map(member=>{
                            return(
                                <Grid.Column width={7} key={uuid()}>
                                    <Card>
                                        <Card.Content>
                                            <Image className="ui avatar image" floated='right' size='mini' src='https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg'/>
                                            <Card.Header>{member.name}</Card.Header>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button className="ui button" value={member.email} size='large' basic color='red' onClick={this.removeFriend}>Remove</Button>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>                              
                                )
                        })
                    }
                </Grid.Row>
            </Grid>
        )}
}
