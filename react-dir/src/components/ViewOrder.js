import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button, Grid, List, Label, Segment, Menu, Icon, Table, Form, Input ,Dimmer,Header,Image} from 'semantic-ui-react'
import img from '../12.jpg';
import logo from '../logo.svg';
let uuid = require('uuid-v4');


export default class ViewOrder extends Component {

	state = {
		'orders' : [
			{'user': "Ahmed", 'item':"Pizza", 'amount':"1", 'price':"70", 'comment':"Mix"},
			{'user': "Omran", 'item':"Fool", 'amount':"2", 'price':"4", 'comment':"Tehena"},
		],
		'joined' : [
		],

		'invited' : [
			{'user': "omran", 'img':"12.jpg"},
			{'user': "omran", 'img':"12.jpg"},
			{'user': "hassan", 'img':"12.jpg"},
			{'user': "hassan", 'img':"12.jpg"},
			{'user': "hassan", 'img':"12.jpg"},
		],

	}


  handleShowInvited = () => this.setState({ active: true ,flag : 'invited'})
	handleShowJoin = () => this.setState({ active: true ,flag : 'joined'})
  handleHide = () => this.setState({ active: false })

	handleSubmit = (e) => {
		let formData = new FormData(document.getElementById('itemForm'))
		console.log(formData.get('item'))
	}

    render() {
			 const { active , flag} = this.state
    return (
			<Grid>
			 <Dimmer.Dimmable as={Segment} blurring dimmed={active}>
				 <Dimmer active={active} onClickOutside={this.handleHide}>

				 <Grid centered >
				 	<Grid.Column centered='true' computer={9}>
						<Grid centered columns={5}>


							{
								this.state.flag === 'invited' && this.state.invited.map((invite)=>{
									return(
										<Grid.Column key={uuid()}>
										<Label as='a' image size='medium'>
												<img src={invite.img} />
												{invite.user}
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
												<img src={join.img} />
												{join.user}
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

						<Grid.Column computer={8}>
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
										        <Table.Cell>{order.user}</Table.Cell>
										        <Table.Cell>{order.item}</Table.Cell>
										        <Table.Cell>{order.amount}</Table.Cell>
										        <Table.Cell>{order.price}</Table.Cell>
										        <Table.Cell>{order.comment}</Table.Cell>
										        <Table.Cell>
										        <Icon link name='delete' size='big' color='red'onClick={this.show}/>
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
						<Grid.Column computer={8}>
						    <Form onSubmit={this.handleSubmit} id='itemForm'>
						        <Form.Group>
						          <Form.Input required name='item' type='text' placeholder='Item'/>
						          <Form.Field required name='amount' control='input' type='number' min={1} max={5} width={3}/>
						          <Form.Field required name='price' control='input' type='number' min={1} width={3}/>
						          <Form.Input required name='comment' type='text' placeholder='Comment' />
						          <Button type='submit' icon='plus' size='small' color = 'teal'/>
						        </Form.Group>
					    	</Form>
						</Grid.Column>




					</Grid.Row>

				</Grid>

			</Dimmer.Dimmable>

	</Grid>
    )
  }
}
