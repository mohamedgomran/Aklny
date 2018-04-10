import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Image, Grid, List, Label, Segment, Divider } from 'semantic-ui-react'
import logo from '../logo.svg';
import OrdersAPI from '../API/orders-api';
import UsersAPI from '../API/users-api';
import {ActionCable} from 'react-actioncable-provider'

let uuid = require('uuid-v4');
var dateFormat = require('dateformat');

export default class Home extends Component {

	constructor(props) {
		super(props);
	}
	state = {
		'latestOrders' : [],
		join_notif : [],
		invite_notif : [],
		'friendActivities' : [],
	}

	componentDidMount() {
		console.log("component load", localStorage.getItem('token'))
		OrdersAPI.getMyOrders((res) => {
			console.log(res)
			this.setState({
				latestOrders: res
			})

		})
		UsersAPI.getMyNotifications((res) => {
			console.log(res);
			this.setState({
				join_notif: res.message.join_notif,
				invite_notif: res.message.invite_notif,
			})
		})
	}

	onReceived(notif) {
		console.log(notif)
		this.setState({
			join_notif: notif.message.join_notif,
			invite_notif: notif.message.invite_notif,
		})
	}

  render() {

    return (
	<Grid centered celled='internally' columns={8}>
	<ActionCable ref='MyNotifications' channel={{channel: 'MyNotificationsChannel'}} onReceived={this.onReceived.bind(this)} />			
		<Grid.Row>
			<Grid.Column computer={5}>
				<Segment>
					<Label color='teal' ribbon><h3>Latest Orders</h3></Label>
					<List>
					{
						this.state.latestOrders.length > 0 && this.state.latestOrders.map((order)=>{
							return(
								<List.Item key={uuid()} as={Link} to={`/orders/${order.id}`}>
								  <List.Icon name={order.order_for==='Breakfast' ? "sun" : "food"} />
								  <List.Content><h3>{order.order_for} on {dateFormat(order.created_at,"fullDate")}</h3></List.Content>
								  <Divider />
								</List.Item>
								
							)
						})
					}
					</List>
				</Segment>
			</Grid.Column>

			<Grid.Column computer={5}>
				<Segment>
					<Label color='teal' ribbon><h3>Freinds Activities</h3></Label>
					<List>
					{
						this.state.invite_notif && this.state.invite_notif.map((order)=>{
							return(
								<List.Item key={uuid()}>
							        <Image avatar src={logo} />
									<List.Content>
									<List.Header as='a'><h3>{order.host.name}</h3></List.Header>
									<List.Description><h3>Created an <Link to={`/orders/${order.id}`}><b>order</b></Link> for <a><b>{order.order_for==='BF' ? "breakfast" : "lunch"}</b></a> from <a><b>{order.res_name}</b></a>.</h3></List.Description>
									</List.Content>
									<Divider />
								</List.Item>
							)
						})
					}
					</List>
				</Segment>
			</Grid.Column>
		</Grid.Row>
	</Grid>
    )
  }
}
