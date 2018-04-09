import axios from 'axios';
let headers = { 
    'Content-Type': 'application/json',
    'Authorization':"Bearer "+localStorage.getItem('token')
 }

let OrdersAPI={
	getMyOrders:(callback) =>{
        axios.get('http://localhost:3000/users/orders', { headers: headers })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
    }
}

export default OrdersAPI;