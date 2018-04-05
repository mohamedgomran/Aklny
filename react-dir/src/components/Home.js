import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Image, Grid, List, Label, Segment } from 'semantic-ui-react'
import logo from '../logo.svg';


export default class Home extends Component {


  render() {

    return (
	<Grid centered celled='internally' columns={8}>
		<Grid.Row>
			<Grid.Column computer={3}>
				<Segment>
					<Label color='teal' ribbon>Latest Orders</Label>
					<List>
					<List.Item as={Link} to='/'>
					  <List.Icon name='sun' />
					  <List.Content>19-2-2017</List.Content>
					</List.Item>
					<List.Item as={Link} to='/'>
					  <List.Icon name='food' />
					  <List.Content>22-8-2017</List.Content>
					</List.Item>
					</List>
				</Segment>
			</Grid.Column>

			<Grid.Column computer={5}>
				<Segment>
					<Label color='teal' ribbon>Freinds Activities</Label>
					<List>
					<List.Item>
				        <Image avatar src={logo} />
						<List.Content>
						<List.Header as='a'>Rachel</List.Header>
						<List.Description>Created an <Link to={`/orders/${8}`}><b>order</b></Link> for <a><b>lunch</b></a> from <a><b>Mac</b></a>.</List.Description>
						</List.Content>
					</List.Item>

					<List.Item>
				        <Image avatar src={logo} />
						<List.Content>
						<List.Header as='a'>Ahmed</List.Header>
						<List.Description>Created an <Link to={`/orders/${9}`}><b>order</b></Link> for <a><b>lunch</b></a> from <a><b>Tabbie</b></a>.</List.Description>
						</List.Content>
					</List.Item>
					</List>
				</Segment>
			</Grid.Column>
		</Grid.Row>
	</Grid>


    )
  }
}
