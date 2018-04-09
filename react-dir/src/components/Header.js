import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Dropdown ,Button,List} from 'semantic-ui-react'
import logo from '../logo.svg';
import UsersAPI from '../API/users-api';
import {ActionCable} from 'react-actioncable-provider'

let uuid = require('uuid-v4');

export default class Header extends Component {
  state = { activeItem: 'home' ,
            join_notif : [],
						invite_notif : []
 					}

 constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
	}
	
	componentDidMount() {
		UsersAPI.getMyNotifications((res) => {
			console.log(res);
			this.setState({
				join_notif: res.message.join_notif,
				invite_notif: res.message.invite_notif,
			})
		})
	}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleChange(event, index, value) {this.setState({value});
console.log("event "+event);
console.log("index "+index);
console.log("value "+value);

}

onReceived(notif) {
	console.log(notif)
	this.setState({
		join_notif: notif.message.join_notif,
		invite_notif: notif.message.invite_notif,
	})
}
  render() {
    const { activeItem } = this.state

    return (

	      <Menu icon size='massive'>

	        <Menu.Item />
					<ActionCable ref='MyNotifications' channel={{channel: 'MyNotificationsChannel'}} onReceived={this.onReceived.bind(this)} />
	        <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
	          <Icon name='home' />
	        </Menu.Item>
					{/* change this static id to be the id of the logged user */}
	        <Menu.Item as={Link} to='/1/friends' name='address book' active={activeItem === 'address book'} onClick={this.handleItemClick}>
	          <Icon name='address book' />
	        </Menu.Item>

	        <Menu.Item as={Link} to='/groups' name='group' active={activeItem === 'group'} onClick={this.handleItemClick}>
	          <Icon name='group' />
	        </Menu.Item>

	        <Menu.Item as={Link} to='/orders' name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick}>
	          <Icon name='list' />
	        </Menu.Item>

			<Menu.Menu position='right' size='massive' >
			  	<Dropdown item simple direction='left' icon = 'bell outline' value={this.state.value} onClick={this.handleChange}>
				  <Dropdown.Menu>
						<Dropdown.Header>My Orders</Dropdown.Header>
                {this.state.join_notif && this.state.join_notif.length > 0 && this.state.join_notif.map(item =>
								<Dropdown.Item key={uuid()}>
										<List>
												<List.Item key={uuid()}>
													<List.Content floated='left'>
														{item.invited.name} has joined your <Link to={`/orders/${item.order_id}`}><b>{item.order_for}</b></Link>
													</List.Content>
													{/* <List.Content floated='right'>
													<Button size='mini' color='teal'>View</Button>
													</List.Content> */}
												</List.Item>
										</List>
								</Dropdown.Item>
            )}
						<Dropdown.Divider />
						<Dropdown.Header>Invitations</Dropdown.Header>
							{this.state.invite_notif && this.state.invite_notif.length > 0 &&this.state.invite_notif.map(item =>
								<Dropdown.Item key={uuid()}>
										<List>
												<List.Item key={uuid()}>
													<List.Content floated='left'>
													{item.host.name} has invited you to his <Link to={`/orders/${item.order_id}`}><b>{item.order_for}</b></Link>
													</List.Content>

													<List.Content floated='right'>
													<Button as={Link} to={`/orders/${item.order_id}`} size='mini' color='teal'>Join</Button>
													</List.Content>
											</List.Item>
									</List>
								</Dropdown.Item>
            )}
              <Dropdown.Item key={uuid()} content={<a href='/AllNotification'>View All Notification</a>} />
				  </Dropdown.Menu>
				</Dropdown>

		        <Menu.Item
		          name='profile'
		          active={activeItem === 'profile'}
		          onClick={this.handleItemClick}
		        >
			      <Image src={logo} avatar />
			      <span>Username</span>
		        </Menu.Item>

		        <Menu.Item name='log-out' active={activeItem === 'log-out'} onClick={this.handleItemClick}>
		          <Icon name='log out' />
		        </Menu.Item>
	        	<Menu.Item />

			</Menu.Menu>
	      </Menu>
    )
  }
}
