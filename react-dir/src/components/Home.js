import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Image, Grid, List, Label, Segment } from 'semantic-ui-react'
import logo from '../logo.svg';
let uuid = require('uuid-v4');


export default class Home extends Component {

	state = {
		'latestOrders' : [
			{'type': "BF", 'date':"18-2-2018", 'id':"1"},
			{'type': "LN", 'date':"22-3-2018", 'id':"2"}
		],
		'friendActivities' : [
			{'friendName':"Ahmed", 'orderId':"1", 'type': "BF", 'from':"Mac"},
			{'friendName':"Omran", 'orderId':"2", 'type': "LN", 'from':"Mac"},
		],
	}
  render() {

    return (
	<Grid centered celled='internally' columns={8}>
		<Grid.Row>
			<Grid.Column computer={3}>
				<Segment>
					<Label color='teal' ribbon>Latest Orders</Label>
					<List>
					{
						this.state.latestOrders.map((order)=>{
							return(
								<List.Item key={uuid()} as={Link} to={`/orders/${order.id}`}>
								  <List.Icon name={order.type==='BF' ? "sun" : "food"} />
								  <List.Content>{order.date}</List.Content>
								</List.Item>
							)
						})
					}
					</List>
				</Segment>
			</Grid.Column>

			<Grid.Column computer={5}>
				<Segment>
					<Label color='teal' ribbon>Freinds Activities</Label>
					<List>
					{
						this.state.friendActivities.map((order)=>{
							return(
								<List.Item key={uuid()}>
							        <Image avatar src={logo} />
									<List.Content>
									<List.Header as='a'>{order.friendName}</List.Header>
									<List.Description>Created an <Link to={`/orders/${order.orderId}`}><b>order</b></Link> for <a><b>{order.type==='BF' ? "breakfast" : "lunch"}</b></a> from <a><b>{order.from}</b></a>.</List.Description>
									</List.Content>
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
