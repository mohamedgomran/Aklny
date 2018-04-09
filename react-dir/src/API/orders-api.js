import axios from 'axios';
let headersFactory = ()=>{
  return { 
	'Content-Type': 'application/json',
	 'Authorization': 'Bearer ' + localStorage.getItem('token') 
	}
}

let OrdersAPI = {
	getAllOrders:(callback)=>{
        axios.get('http://localhost:3000/orders', { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
}


export default OrdersAPI;
