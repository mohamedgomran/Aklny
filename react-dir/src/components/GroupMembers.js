import React from 'react';
import { Input, Button, Container, Header, Icon, Card, Image, Grid, Segment, Tab } from 'semantic-ui-react'
var uuid = require('uuid-v4');

export default class GroupMember extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            members: []
        }
    }

    render() {
        return(
            <div>
               <div align="center">
                    <Input validations={{matchRegexp:this.groupRegex}} onChange={this.handleChange} value={this.state.groupName}  id="addGroup" icon='user' iconPosition='left' placeholder="Friend's Name" />  
                    <Button secondary onClick={this.addGroup}>ADD</Button>
                </div> 
            </div>
        )}
}
