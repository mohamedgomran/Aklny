import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import GridRow, { Button, Grid, Label, Segment, Menu, Icon, Table, Form, Dimmer, Image } from 'semantic-ui-react'
import axios from 'axios';
import {ActionCable} from 'react-actioncable-provider'
import UserAPI from '../API/users-api'
import OrdersAPI from '../API/orders-api';
import DOMAIN from '../API/domain';

let uuid = require('uuid-v4');


export default class ViewOrder extends Component {


	orderId = this.props.match.params.id;
	state = {
		orders : [],
		joined : [],
		invited : [],
		user:'',
		order : "",
	}

	constructor(props){
		super(props);
		this.getUserId();
	}


    componentDidMount(){
    	OrdersAPI.getOrder(this.orderId,(res)=>{
    		if (res.success) {
    			this.setState({order:res.message})
    		}
    	})
		// this.getOrderItems();
		this.getInvited();
		this.getJoined();		
	}

	getInvited = ()=>{
		axios.get(`${DOMAIN}/orders/${this.orderId}/invited`, {
			headers:{
				'Content-Type': 'application/json',
				'Authorization':"Bearer "+localStorage.getItem('token')
			}
		}).then((response)=>{
			this.setState({invited: response.data.message})
		}).catch((error)=>{
			console.log(error)
		})
	}

	getOrderItems = ()=>{
		axios.get(`${DOMAIN}/orders/${this.orderId}/items`, {
			headers:{
				'Content-Type': 'application/json',
				'Authorization':"Bearer "+localStorage.getItem('token')
			}
		}).then((response)=>{
			console.log("ll",response.data.message);
			if (response.data.success === false) {
				console.log(response.data.success)
				this.setState({
					badRequest: true,
				})
			} else {
				console.log(response.data.message)
				this.setState({orders: response.data.message})
			}
		}).catch((error)=>{
			console.log(error)
		})

	}

	removeOrder = (e)=>{
		console.log(e.target.value);
		let itemToDeleteId = e.target.value;
		axios.delete(`${DOMAIN}/orders/${this.orderId}/items/${itemToDeleteId}`,{
			headers:{
				'Content-Type': 'application/json',
				'Authorization':"Bearer "+localStorage.getItem('token')
			}
		}).then(response=>{
			// this.getOrderItems();
		}).catch(error=>{
			console.log(error);
		})

	}

	getUserId = () => {
		UserAPI.getuserdata((res) => {
			this.setState({
				user: res.data.user
			})
			console.log("res",this.state.user.id)
			this.getOrderItems();
		})
	}

  	handleShowInvited = () => this.setState({ active: true ,flag : 'invited'})

	handleShowJoin = () => this.setState({ active: true ,flag : 'joined'})

  	handleHide = () => this.setState({ active: false })

	handleSubmit = (e) => {
		let form = document.getElementById('itemForm')
		let formData = new FormData(form)
		console.log(formData);

		axios.post(`${DOMAIN}/orders/${this.orderId}/items`, {
			"item": formData.get("item"),
			"price": formData.get("price"),
			"amount": formData.get("amount"),
			"comment": formData.get("comment")
		},{
			headers:{
				'Content-Type': 'application/json',
				'Authorization':"Bearer "+localStorage.getItem('token')
			}}).then((response)=>{
				// this.getOrderItems();
				console.log(response)
			}).catch(error=>{
				console.log(error)
			})
	}

	onReceived(orderDetails){
		console.log("hello",orderDetails)
		this.setState({orders: orderDetails})
	}

	getJoined = ()=>{
		axios.get(`${DOMAIN}/orders/${this.orderId}/joined`, {
				headers:{
					'Content-Type': 'application/json',
					'Authorization':"Bearer "+localStorage.getItem('token')
				}
			}).then((response)=>{
				this.setState({joined: response.data.message})
				console.log(response.data.message);
				
			}).catch((error)=>{
				console.log(error)
			})
	}

    render() {
	const { active , flag} = this.state

	if (this.state.badRequest) {
		return <Redirect to='/NotFound' />
	}
    return (
			<Grid>
			<ActionCable ref='MyNotifications' channel={{channel: 'OrderDetailsChannel', oid: this.orderId}} onReceived={this.onReceived.bind(this)} />
			 <Dimmer.Dimmable  blurring dimmed={active}>
				 <Dimmer active={active} onClickOutside={this.handleHide}>

				 <Grid centered >
				 	<Grid.Column centered='true' width={9}>
						<Grid centered columns={5}>
							{
								this.state.flag === 'invited' && this.state.invited.map((invite)=>{
									return(
										<Grid.Column key={uuid()}>
										<Label as='a' image size='medium'>
												<img src={invite.pic} alt="alt"/>
												{invite.name}
											</Label>
											</Grid.Column>
									)
								})
							}

							{
								this.state.flag === 'joined' && this.state.joined.map((join)=>{
									return(
										<Grid.Column key={uuid()}>
										<Label as='a' image size='medium'>
												<img src={join.pic} alt="img" />
												{join.name}
											</Label>
											</Grid.Column>
									)
								})
							}


							</Grid>
						</Grid.Column>
					</Grid>
				 </Dimmer>

				<Grid centered divided columns={8}>

					<Grid.Row>
						<Menu compact>
						    <Menu.Item as='a' onClick={this.handleShowJoin}>
						      <Icon name='chain' /> Joined
									{
										this.state.joined.length > 0 && <Label color='green' floating>{this.state.joined.length}</Label>
									}

						    </Menu.Item>
						    <Menu.Item as='a' onClick={this.handleShowInvited}>
						      <Icon name='users' /> Invited
									{
										this.state.invited.length > 0 && <Label color='green' floating>{this.state.invited.length}</Label>
									}
						    </Menu.Item>
						</Menu>
					</Grid.Row>


					<Grid.Row>
						<Grid.Column width={8}>
							<Table size='large' textAlign='center' celled selectable>
							    <Table.Header>
							      <Table.Row>
							        <Table.HeaderCell >Name</Table.HeaderCell>
							        <Table.HeaderCell >Item</Table.HeaderCell>
							        <Table.HeaderCell >Amount</Table.HeaderCell>
							        <Table.HeaderCell >Price</Table.HeaderCell>
							        <Table.HeaderCell >Comment</Table.HeaderCell>
							        <Table.HeaderCell >Actions</Table.HeaderCell>
							      </Table.Row>
							    </Table.Header>

							    <Table.Body>
							  		{
							  			this.state.orders.length===0 && (
											<Table.Row warning>
												<Table.Cell colSpan='6'>There is no orders</Table.Cell>
											</Table.Row>
						    			)
							  		}
							    	{
								    	this.state.orders.length>0 && this.state.orders.map((order)=>{
								    		return(

										      <Table.Row key={uuid()}>
										        <Table.Cell>{order.user_name.name}</Table.Cell>
										        <Table.Cell>{order.item}</Table.Cell>
										        <Table.Cell>{order.amount}</Table.Cell>
										        <Table.Cell>{order.price}</Table.Cell>
										        <Table.Cell>{order.comment}</Table.Cell>
												<Table.Cell>
														{this.state.user.id === order.user_id && this.state.order.status !== 'finished' && <Button value={order.id} size="medium" basic color="red" onClick={this.removeOrder}>Remove</Button> }
										        </Table.Cell>
										      </Table.Row>
								    		)
								    	})
							    	}
							    </Table.Body>
							</Table>


						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8}>
						    <Form onSubmit={this.handleSubmit} id='itemForm'>
						        <Form.Group>
						          <Form.Input required name='item' type='text' placeholder='Item' disabled={this.state.order.status ==='finished'}/>
						          <Form.Field required name='amount' control='input' type='number' min={1} max={5} width={3} disabled={this.state.order.status ==='finished'}/>
						          <Form.Field required name='price' control='input' type='number' min={1} width={3} disabled={this.state.order.status ==='finished'} />
						          <Form.Input required name='comment' type='text' placeholder='Comment' disabled={this.state.order.status ==='finished'}/>
						          <Button type='submit' icon='plus' size='small' color = 'teal' disabled={this.state.order.status ==='finished'}/>
						        </Form.Group>
					    	</Form>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16} >
							<div align="center">
								<Image 
									label={{ color: 'teal', content: 'Menu', icon: 'food', ribbon: true }}
									src={this.state.order.menu} size="large" />
							</div>
						</Grid.Column>
					</Grid.Row>

				</Grid>

			</Dimmer.Dimmable>
	</Grid>
    )
  }
}
