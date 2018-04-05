import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button, Grid, List, Label, Segment, Menu, Icon, Table, Form, Input } from 'semantic-ui-react'
let uuid = require('uuid-v4');


export default class ViewOrder extends Component {

	state = {
		'orders' : [
			{'user': "Ahmed", 'item':"Pizza", 'amount':"1", 'price':"70", 'comment':"Mix"},
			{'user': "Omran", 'item':"Fool", 'amount':"2", 'price':"4", 'comment':"Tehena"},
		],
	}

	handleSubmit = (e) => {
		let formData = new FormData(document.getElementById('itemForm'))
		console.log(formData.get('item'))
	}

    render() {

    return (
	<Grid centered divided columns={8}>
		<Grid.Row>
			<Menu compact>
			    <Menu.Item as='a'>
			      <Icon name='chain' /> Joined
			      <Label color='green' floating>22</Label>
			    </Menu.Item>
			    <Menu.Item as='a'>
			      <Icon name='users' /> Invited
			      <Label color='teal' floating>22</Label>
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
			<Grid.Column computer={7}>
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
    )
  }
}
