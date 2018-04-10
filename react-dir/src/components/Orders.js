import React from 'react'
import { Link } from "react-router-dom";
import { Confirm ,Table,Grid,Icon,Pagination } from 'semantic-ui-react'
import OrdersAPI from '../API/orders-api';
let uuid = require('uuid-v4');

class Orders extends React.Component {

  constructor(props){
   super(props);
   this.state = {
        offset : 0,
        size: 3,
        open: false,
        result: 'show the modal to capture a result',
        orders:[]
   }
 }

 handleClick(offset) {
    this.setState({offset});
  }
 show = () => this.setState({open: true })
 handleConfirm = () => this.setState({ result: 'confirmed', open: false })
 handleCancel = () => this.setState({ result: 'cancelled', open: false })
 componentDidMount(){
  OrdersAPI.getAllOrders((res)=>{
    if (res.success) {
      console.log(res.message)
      this.setState({orders:res.message})
    }
  })
 }
 finishOrder = (oid)=>{
  OrdersAPI.finishOrder(oid, (res)=>{
    if (res.success) {
      this.setState({orders:res.message})
    }
  })
 }
 deleteOrder = (oid)=>{
  console.log(oid)
  OrdersAPI.deleteOrder(oid, (res)=>{
    if (res.success) {
      this.setState({orders:res.message})
    }
  })
 }
  render() {
    // const { open, result } = this.state
    // let rows = [];
    // for (var i = 0; i < this.state.size; i++){
    //   let rowID = `row${i}`
    //   let cell = []
    //   for (var idx = 0; idx < this.state.size; idx++){
    //     let cellID = `cell${i}-${idx}`
    //     cell.push(<td key={cellID} id={cellID}></td>)
    //   }
    //   rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    // }
    return(

  <Grid centered celled columns={8} >
  <Grid.Column celled='centered' width={4}>
      <h1><b>All Orders</b></h1>
  </Grid.Column>


  <Grid.Column floated='right' width={3} as={Link} to={'/add-order'}>
    <Icon name='add square' size='big' color='teal'/>
  </Grid.Column>

  <Grid.Row className='centered three columns'>
  <Confirm
   open={this.state.open}
   onCancel={this.handleCancel}
   onConfirm={this.handleConfirm}
  />
  </Grid.Row>
	<Grid.Row>
    <Grid.Column computer={12}>

      <Table size='small' textAlign='center' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >Resturnats</Table.HeaderCell>
            <Table.HeaderCell >Invited</Table.HeaderCell>
            <Table.HeaderCell >Joined</Table.HeaderCell>
            <Table.HeaderCell >Status</Table.HeaderCell>
            <Table.HeaderCell width={4} >Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            this.state.orders.length>0&&this.state.orders.map((order) => {
                return (
                  <Table.Row key={uuid()}>
                    <Table.Cell>{order.res_name}</Table.Cell>
                    <Table.Cell>{order.invited}</Table.Cell>
                    <Table.Cell>{order.joined}</Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/orders/${order.id}`}> <Icon link name='folder open' size='big' color='teal'/></Link>
                      {order.status!=='finished'&&<Icon link name='checkmark'  size='big' color='green' onClick={this.finishOrder.bind(this, order.id)}/>}
                      {order.status!=='finished'&&<Icon link name='delete' size='big' color='red'onClick={this.deleteOrder.bind(this, order.id)}/>}
                    </Table.Cell>
                  </Table.Row>
                )
            })

          }
        </Table.Body>
      </Table>
    </Grid.Column>
  </Grid.Row>

{ /*  <Grid.Row>
 <Pagination
         offset={this.state.offset}
         limit={10}
         total={100}
         onClick={(e, props, offset) => this.handleClick(offset)}
       />
  </Grid.Row>*/}
</Grid>

    );
  }
}

export default Orders;
