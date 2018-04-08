import React from 'react';
import GridRow, { Form, Label, Input, Button, Container, Header, Icon, Card, Image, Grid, Segment, Tab } from 'semantic-ui-react'
import GroupsAPI from '../API/groups-api';
var uuid = require('uuid-v4');

export default class GroupMember extends React.Component {
    constructor(props) {
        super(props)
        this.addFriendRef = React.createRef()
        this.state = {
            newFriend:null,
            groupMembers: [],
            friendError:""
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

    handleAddFriendChange = (e) => {
        this.setState(prevState=>{
            if (prevState.friendError){
                return {friendError:""}
            }
        })
    }

    addFriend = (e) => {
        let email = this.addFriendRef.current.inputRef.value
        console.log(email)
        // GroupsAPI.addFriend(email, (res)=>{
        //     if (res.success) {
        //         this.setState({groups:res.message})
        //     }else{
        //         this.setState({groupError:res.message})
        //     }
        // })
    }

    removeFriend = (e)=>{
        let groupId = this.props.groupId
        let friendId = e.target.value
        GroupsAPI.deleteMember(groupId, friendId, (res)=>{
            if (res.success) {
                console.log(res.message)
                this.setState(prevState=>{
                    return {groupMembers:res.message}
                })
            }
        })


        
    }

    render() {
        return(
            <Grid>
                <Grid.Row centered>
                    <Form>
                        <Form.Group>
                            <Form.Field>
                                <Input onChange={this.handleAddFriendChange} ref={this.addFriendRef} validations={{matchRegexp:this.groupRegex}} icon='group' iconPosition='left' placeholder='Friend email' />  
                                {this.state.friendError&&<Label basic color='red' pointing>{this.state.friendError}</Label>}
                            </Form.Field>
                            <Form.Button secondary onClick={this.addFriend}>ADD</Form.Button>
                        </Form.Group>
                    </Form>
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
                                            <Button className="ui button" value={member.id} size='large' basic color='red' onClick={this.removeFriend}>Remove</Button>
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
