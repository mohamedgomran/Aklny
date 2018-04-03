import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Grid } from 'semantic-ui-react'
import logo from '../logo.svg';

export default class Header extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
   
	      <Menu icon size='massive'>
	      
	        <Menu.Item />

	        <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} link='true' onClick={this.handleItemClick}>
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
	              
	        <Menu.Menu position='right'>
		        
		        <Menu.Item name='notifications' active={activeItem === 'notifications'} onClick={this.handleItemClick}>
		          <Icon name='bell outline' />
		        </Menu.Item>  
		        <Menu.Item
		          name='profile'
		          active={activeItem === 'profile'}
		          onClick={this.handleItemClick}
		        >
			      <Image src={logo} avatar />
			      <span>Username</span>
		        </Menu.Item>

		        <Menu.Item name='log out' active={activeItem === 'log out'} onClick={this.handleItemClick} Float Right>
		          <Icon name='log out' />
		        </Menu.Item>
	        	<Menu.Item />

	        </Menu.Menu>
	      </Menu>
    )
  }
}
