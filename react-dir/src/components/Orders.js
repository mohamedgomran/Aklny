import React from 'react'
import { Button, Confirm ,Table} from 'semantic-ui-react'


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
      <Table size='small'>
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
        <button class="mini ui active button">View</button>
        <button class="mini positive ui button" id="btnsuccessRight">Finish</button>
        <button class="mini negative ui button" onClick={this.show} id="btnDangerRight">
        Cancel
        </button>
        </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>mac</Table.Cell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>waiting</Table.Cell>
            <Table.Cell>
            <button class="mini ui active button">View</button>
            <button class="mini positive ui button" id="btnsuccessRight">Finish</button>
            <button class="mini negative ui button" onClick={this.show} id="btnDangerRight">
            Cancel
            </button>
            </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>mac</Table.Cell>
                <Table.Cell>5</Table.Cell>
                <Table.Cell>6</Table.Cell>
                <Table.Cell>waiting</Table.Cell>
                <Table.Cell>
                <button class="mini ui active button">View</button>
                <button class="mini positive ui button" id="btnsuccessRight">Finish</button>
                <button class="mini negative ui button" onClick={this.show} id="btnDangerRight">
                Cancel
                </button>
                </Table.Cell>
                  </Table.Row>
        </Table.Body>
      </Table>

    );
  }
}

export default Orders;
