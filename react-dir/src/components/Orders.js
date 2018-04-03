import React from 'react'


class Orders extends React.Component {

  constructor(props){
   super(props);
   this.state = {size: 3}
 }

  render() {

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
      <div className="container" class="ui grid centered">
      <div className="four column row">
          <div class="left floated column"><h2>Orders</h2></div>
          <div class="right floated column">
              <button class="ui right floated button">Start New Order</button>
          </div>
      </div>
      <div className="row centered">
        <div class="row">
        <table class="ui selectable inverted table ten wide column">
            <thead>
             <tr>
               <th>Order</th>
               <th>Resturnats</th>
               <th>Invited</th>
               <th>Joined</th>
               <th>Status</th>
               <th class="five wide">Actions</th>
             </tr>
           </thead>
           <tbody>
             <tr>
                <td>breakfast</td>
                <td>mac</td>
                <td>5</td>
                <td>10</td>
                <td>waiting</td>
                <td>
                <button class="mini ui active button">View</button>
                <button class="mini positive ui button">Finish</button>
                <button class="mini negative ui button">Cancel</button>
                </td>
              </tr>
           </tbody>
         </table>
      </div>
    </div>
  </div>
    );
  }
}

export default Orders;
