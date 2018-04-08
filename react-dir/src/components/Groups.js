import React from 'react';
import { Form,Input, Button, Container, Header, Icon, Card, Image, Grid, Segment, Tab, Label, Menu, List } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import GroupMember  from './GroupMembers'
import axios from 'axios';
import GroupsAPI from '../API/groups-api';
var uuid = require('uuid-v4');

export default class Groups extends React.Component {

    groupRegex = new RegExp('/[:alpha:]+$/')
  
    constructor(props) {
        super(props);
        this.addGroupRef = React.createRef()
        this.state = {
            groupName: "",
            activeItem: 'inbox',
            groups: [],
            groupError:"",
        }
    }

    componentWillUpdate(newprops){
        console.log("my new props are ",newprops)
    }
    groupRegex = new RegExp('/[:alpha:]+$/')

    componentDidMount(){
        GroupsAPI.getAllGroups((res)=>{
            this.setState({groups:res})
        })
    }

    handleItemClick = (e, { name }) => {
        console.log("My Active Item is ",name)
        this.setState({ activeItem: name });

    }

    addGroup = (e) => {
        let name = this.addGroupRef.current.inputRef.value
        GroupsAPI.addGroup(name, (res)=>{
            if (res.success) {
                this.setState({groups:res.message})
            }else{
                this.setState({groupError:res.message})
            }
        })
    }

    handleAddGroupChange = ()=>{
        this.setState(prevState=>{
            if (prevState.groupError){
                return {groupError:""}
            }
        })
    }

    removeGroup = (e) => {
        let newGroups=[]
        let removeId = e.target.value;
        console.log("My Active Item in remove group is ",removeId)
        this.state.groups.forEach(group => {
        console.log("My group id in remove is ",removeId)
        console.log("My remove id in remove is ",group.id)
        console.log(removeId != group.id)
            if (group.id != removeId) {
                newGroups.push(group);
            }
        });
        console.log(newGroups);
        this.setState(() => {
        return {
            groups:  newGroups,
        }
    })


        //loop on the array and remove the removed group
    }
    render() {
        return (
                 <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={5}>
                            <h1>Groups</h1>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <div>
                            <Form>
                                <Form.Group>
                                    <Form.Field>
                                        <Input onChange={this.handleAddGroupChange} ref={this.addGroupRef}validations={{matchRegexp:this.groupRegex}} id="addGroup" icon='group' iconPosition='left' placeholder='Group Name' />  
                                        {this.state.groupError&&<Label basic color='red' pointing>{this.state.groupError}</Label>}
                                    </Form.Field>
                                    <Form.Button secondary onClick={this.addGroup}>ADD</Form.Button>
                                </Form.Group>
                            </Form>
                            </div>
                        </Grid.Column>
                        
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column width={4}>
                            <Segment>
                                <Container fluid>
                                    <Header as='h3' icon textAlign='center'>
                                        <Icon name='users' circular />
                                        <Header.Content>
                                            My Groups
                                        </Header.Content>
                                    </Header>
                                </Container>
                                <Container fluid>
                                    <List verticalAlign='middle' divided animated vertical="true" relaxed>
                                        {this.state.groups.length>0&&this.state.groups.map(group => {
                                            return (
                                                <List.Item key={uuid()} as={Link} to={`/groups/${group.id}`} name={group.name} active={this.state.activeItem === group.name} onClick={this.handleItemClick}>
                                                    <List.Content>
                                                        <List.Header>{group.name}</List.Header>
                                                    </List.Content>
                                                    <Button className="ui icon button" value={group.id} floated="right" circular color='red' onClick={this.removeGroup} >
                                                        <i className="icon remove"></i>
                                                    </Button>
                                                    <Button value={group.id} floated="right" circular color='green' >
                                                        <i className="icon add user" value={group.id}></i>
                                                    </Button>
                                                </List.Item>
                                            )
                                        })
                                        }
                                    </List>
                                </Container>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={9}>
                        {this.props.match.params.name && <Segment>
                            <GroupMember groupId={this.state.activeItem} />              
                            </Segment>
                        }   
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
        )
    }
}