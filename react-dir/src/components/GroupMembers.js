import React from 'react';
import { Form, Label, Input, Button, Card, Image, Grid } from 'semantic-ui-react'
import GroupsAPI from '../API/groups-api';
var uuid = require('uuid-v4');

export default class GroupMember extends React.Component {
    constructor(props) {
        super(props)
        this.addMemberRef = React.createRef()
        this.state = {
            newFriend:null,
            groupMembers: [],
            friendError:"",
            groupId:""
        }
        console.log("my params are",this.props)
    }

    componentWillReceiveProps(prop){
        this.setState({groupId:prop.groupId})
        console.log(prop.groupId)
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

    addMember = (e) => {
        let email = this.addMemberRef.current.inputRef.value
        console.log(this.state.groupId, "sacasc")
        GroupsAPI.addMember(this.props.groupId, email, (res)=>{
            if (res.success) {
                console.log(res.message)
                this.setState(prevState=>{
                    return {groupMembers:res.message}
                })
            }else{
                console.log(res)
                this.setState({groupError:res.message})
            }
        })
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
                    { this.state.groupId && <Form>
                        <Form.Group>
                            <Form.Field>
                                <Input onChange={this.handleAddFriendChange} ref={this.addMemberRef} validations={{matchRegexp:this.groupRegex}} icon='group' iconPosition='left' placeholder='Friend email' />  
                                {this.state.friendError&&<Label basic color='red' pointing>{this.state.friendError}</Label>}
                            </Form.Field>
                            <Form.Button secondary onClick={this.addMember}>ADD</Form.Button>
                        </Form.Group>
                    </Form> }
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
