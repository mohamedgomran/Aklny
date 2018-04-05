import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Dropdown ,Button} from 'semantic-ui-react'
import logo from '../logo.svg';

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
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleChange(event, index, value) {this.setState({value});
console.log(event);
console.log(index);
console.log(value);

}
  render() {
    const { activeItem } = this.state

    return (

	      <Menu icon size='massive'>

	        <Menu.Item />

	        <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
	          <Icon name='home' />
	        </Menu.Item>

	        <Menu.Item as={Link} to='/friends' name='address book' active={activeItem === 'address book'} onClick={this.handleItemClick}>
	          <Icon name='address book' />
	        </Menu.Item>

	        <Menu.Item as={Link} to='/groups' name='group' active={activeItem === 'group'} onClick={this.handleItemClick}>
	          <Icon name='group' />
	        </Menu.Item>

	        <Menu.Item as={Link} to='/orders' name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick}>
	          <Icon name='list' />
	        </Menu.Item>

			<Menu.Menu position='right' size='massive'>
			  	<Dropdown item icon = 'bell outline'>
				  <Dropdown.Menu value={this.state.value} onChange={this.handleChange}>
                {this.state.items.map(item =>
              <Dropdown.Item key={item.value}>{item.value}<Button size='mini' color='teal'  >Joined</Button></Dropdown.Item>
            )}
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
