import React, { Component } from 'react'
import { Link  } from "react-router-dom";
import { Icon, Menu, Image, Dropdown ,Button,List} from 'semantic-ui-react'
import logo from '../logo.svg';
import UsersAPI from '../API/users-api';
import {ActionCable} from 'react-actioncable-provider'
import axios from 'axios';
import OrdersAPI from '../API/orders-api';


let uuid = require('uuid-v4');

export default class Header extends Component {
  state = { activeItem: 'home' ,
            items : [
          { value: "ahmed has joined you to orders  ",Status: 'orders' },
          { value: "ahmed invited you to his breakfast  ",Status: 'joined' },
          { value: "omran Joined to your order  ",Status: 'orders' },
					],
					logout:false,user:'',userId:'',userimg:'',logged:false,
            join_notif : [],
						invite_notif : []
 					}

 constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
		this.handellogout=this.handellogout.bind(this);
		this.getuserdata-this.getuserdata.bind(this);
		this.getuserdata();

	}

  getuserdata(){

	 //************************************get user data *****************************
	 if(localStorage.getItem('token') !== null)
	 {
			//request to get User data
			axios.get('http://localhost:3000/auth', {
			 headers: {
				 'Content-Type': 'application/json',
				 'Authorization':"Bearer "+localStorage.getItem('token')
			 }
			 }).then( (response)=> {

				 this.setState({logged:true,user:response.data.user.name,userId:response.data.user.id,userimg:response.data.user.pic});
				 //redirect to hom page

			 })
			 .catch((error)=> {
				 console.log(error);
			 });


	 }
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


	componentDidUpdate(prevProps, prevState)
	{
			if(!this.state.logged)
			 {
       this.getuserdata()
			 }
	}



	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handellogout(){
		this.setState({user:''});
		localStorage.getItem('token') !== null ?localStorage.removeItem('token'):'';
		localStorage.getItem('user') !== null ?localStorage.removeItem('user'):'';
		this.setState({logout:true,logged:false});
	};


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

join = (e) => {
	console.log(e.target.value)
	let oid = e.target.value;
	OrdersAPI.joinOrder(oid, (response) => {
			console.log(response);
		})
}
// deleteOrder = (oid)=>{
//   console.log(oid)
//   OrdersAPI.deleteOrder(oid, (res)=>{
//     if (res.success) {
//       this.setState({orders:res.message})
//     }
//   })
//  }

  render() {

	 const { activeItem } = this.state


    return (


	      <Menu icon size='massive'>

				  <Menu.Item />
					<ActionCable ref='MyNotifications' channel={{channel: 'MyNotificationsChannel'}} onReceived={this.onReceived.bind(this)} />

					{this.state.logged&&<Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
	          <Icon name='home' />
	        </Menu.Item>}
					{/* change this static id to be the id of the logged user */}
					{this.state.logged&&
	        <Menu.Item as={Link} to='/friends' name='address book' active={activeItem === 'address book'} onClick={this.handleItemClick}>
	          <Icon name='address book' />
	        </Menu.Item>}

					{this.state.logged&&
	        <Menu.Item as={Link} to='/groups' name='group' active={activeItem === 'group'} onClick={this.handleItemClick}>
	          <Icon name='group' />
	        </Menu.Item>}

           {this.state.logged&&
	        <Menu.Item as={Link} to='/orders' name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick}>
	          <Icon name='list' />
	        </Menu.Item>}


          {this.state.logged&&
         <Menu.Item as={Link} to='/myorders' name='myorders' active={activeItem === 'myorders'} onClick={this.handleItemClick}>
           <Icon name='first order' />
         </Menu.Item>}

			 <Menu.Menu position='right' size='massive' >
			 {this.state.logged&&
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
													<Button value={item.order_id} onClick={this.join} size='mini' color='teal'>Join</Button>
													</List.Content>
											</List.Item>
									</List>
								</Dropdown.Item>
            )}
              <Dropdown.Item key={uuid()} content={<a href='/AllNotification'>View All Notification</a>} />
				  </Dropdown.Menu>
				</Dropdown>
			 }

			 {this.state.logged&&
		        <Menu.Item
		          name='profile'
		          active={activeItem === 'profile'}
		          onClick={this.handleItemClick}
		        >
						{this.state.logged?
			      <Image src={this.state.userimg} size='mini' />:<Image src={logo} avatar />
						}
			      <span>
							{this.state.user !== ''?
							 this.state.user
							:'Username'}
							</span>

		        </Menu.Item>
			 }
			     {this.state.logged&&
		        <Menu.Item as={Link} to='/login' name='log-out' active={activeItem === 'log-out'} onClick={this.handellogout}>
		          <Icon name='log out' />
		        </Menu.Item>
					 }

	       {this.state.logged === false&&
          <Menu.Item as={Link} to='/login' name='log-in'>
				      	Login
							<Icon name='sign in' />

		        </Menu.Item>
	          }

					{this.state.logged === false&&
					<Menu.Item as={Link} to='/register' name='log-out'>
				 	SignUp
							<Icon name='add user' />

		        </Menu.Item>
					}
	        	<Menu.Item />

			</Menu.Menu>
			</Menu>
    )
  }
}
