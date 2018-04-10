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
	finishOrder:(oid, callback)=>{
        axios.put(`http://localhost:3000/orders/${oid}`,{} , { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	deleteOrder:(oid, callback)=>{
        axios.delete(`http://localhost:3000/orders/${oid}`, { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
    },
    
  getMyOrders:(callback) =>{
        axios.get('http://localhost:3000/users/orders', { headers: headersFactory() })
        .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
  },
  
  joinOrder: (oid, callback) => {
    axios.put(`http://localhost:3000/orders/${oid}/join`,{} , {headers: headersFactory() })
    .then ((response) => {
      callback(response)
    })
    .catch((error) => {
      callback(error)
    })
  },
  getOrder: (oid, callback) => {
    axios.get(`http://localhost:3000/orders/${oid}/`,{} , {headers: headersFactory() })
    .then ((response) => {
      console.log(response)
      callback(response.data)
    })
    .catch((error) => {
      callback(error)
    })
  },

}


export default OrdersAPI;
