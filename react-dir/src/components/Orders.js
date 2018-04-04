import React from 'react'
import { Button, Confirm ,Table,Grid,Icon } from 'semantic-ui-react'


class Orders extends React.Component {

  constructor(props){
   super(props);
   this.state = {size: 3,
        open: false,
        result: 'show the modal to capture a result'
   }
 }

 show = () => this.setState({open: true })
 handleConfirm = () => this.setState({ result: 'confirmed', open: false })
 handleCancel = () => this.setState({ result: 'cancelled', open: false })

  render() {
    const { open, result } = this.state
    let rows = [];
    for (var i = 0; i < this.state.size; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.state.size; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td key={cellID} id={cellID}></td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(

  <Grid centered celled='internally centered'  columns={8} >
  <Grid.Row className='centered three columns'>
  <Confirm
   open={open}
   onCancel={this.handleCancel}
   onConfirm={this.handleConfirm}
  />
  </Grid.Row>
		<Grid.Row>
    <Grid.Column computer={12}>
      <Table size='small' textAlign='center'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell >Order</Table.HeaderCell>
        <Table.HeaderCell >Resturnats</Table.HeaderCell>
        <Table.HeaderCell >Invited</Table.HeaderCell>
        <Table.HeaderCell >Joined</Table.HeaderCell>
        <Table.HeaderCell >Status</Table.HeaderCell>
        <Table.HeaderCell width={5} >Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>mac</Table.Cell>
        <Table.Cell>5</Table.Cell>
        <Table.Cell>6</Table.Cell>
        <Table.Cell>waiting</Table.Cell>
        <Table.Cell>
        <Icon link name='folder open' size='big' color='teal'/>
        <Icon link name='checkmark'  size='big' color='grean'/>
        <Icon link name='delete' size='big' color='red'onClick={this.show}/>
        </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>mac</Table.Cell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>waiting</Table.Cell>
            <Table.Cell>
            <Icon link name='folder open' size='big' color='teal'/>
            <Icon link name='checkmark'  size='big' color='grean'/>
            <Icon link name='delete' size='big' color='red'onClick={this.show}/>
            </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>mac</Table.Cell>
                <Table.Cell>5</Table.Cell>
                <Table.Cell>6</Table.Cell>
                <Table.Cell>waiting</Table.Cell>
                <Table.Cell>
                <Icon link name='folder open' size='big' color='teal'/>
                <Icon link name='checkmark'  size='big' color='grean'/>
                <Icon link name='delete' size='big' color='red'onClick={this.show}/>
                </Table.Cell>
                  </Table.Row>
        </Table.Body>
      </Table>

      </Grid.Column>

  </Grid.Row>

</Grid>

    );
  }
}

export default Orders;
