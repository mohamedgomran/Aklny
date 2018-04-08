import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Dropdown ,Button,List} from 'semantic-ui-react'
import logo from '../logo.svg';

let uuid = require('uuid-v4');

export default class Header extends Component {
  state = { activeItem: 'home' ,
            items : [
          { value: "ahmed has joined you to orders  ",Status: 'orders' },
          { value: "ahmed invited you to his breakfast  ",Status: 'joined' },
          { value: "omran Joined to your order  ",Status: 'orders' },
          ]
 }

 constructor(props) {
    super(props);
		this.handleChange=this.handleChange.bind(this);
		this.handellogout=this.handellogout.bind(this);
  }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handellogout(){
		{localStorage.getItem('token') !== null ?localStorage.removeItem('token'):''}
	};

  handleChange(event, index, value) {this.setState({value});
console.log("event "+event);
console.log("index "+index);
console.log("value "+value);

}
  render() {
    const { activeItem } = this.state

    return (

	      <Menu icon size='massive'>

	        <Menu.Item />

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
                {this.state.items.map(item =>
              <Dropdown.Item key={uuid()}>
                  <List>
                      <List.Item key={uuid()}>
                        <List.Content floated='left'>
                          {item.value}
                        </List.Content>

                        <List.Content floated='right'>
                        <Button size='mini' color='teal'>Joined</Button>
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
			      <span>
							{ localStorage.getItem('user')!==null?
							 JSON.parse(localStorage.getItem('user')).name
							:'Username'}
							</span>
		        </Menu.Item>
						
		        <Menu.Item name='log-out' active={activeItem === 'log-out'} onClick={this.handellogout}>
		          <Icon name='log out' />
		        </Menu.Item>
	        	<Menu.Item />

			</Menu.Menu>
	      </Menu>
    )
  }
}
