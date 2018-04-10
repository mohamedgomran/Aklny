import axios from 'axios';
import DOMAIN from './domain';
let headersFactory = ()=>{
  return { 
	'Content-Type': 'application/json',
	 'Authorization': 'Bearer ' + localStorage.getItem('token') 
	}
}

let OrdersAPI = {
	getAllOrders:(callback)=>{
        axios.get(`${DOMAIN}/orders`, { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	finishOrder:(oid, callback)=>{
        axios.put(`${DOMAIN}/orders/${oid}`,{} , { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	deleteOrder:(oid, callback)=>{
        axios.delete(`${DOMAIN}/orders/${oid}`, { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
    },
    
  getMyOrders:(callback) =>{
        axios.get(`${DOMAIN}/users/orders`, { headers: headersFactory() })
        .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
  },
  
  joinOrder: (oid, callback) => {
    axios.put(`${DOMAIN}/orders/${oid}/join`,{} , {headers: headersFactory() })
    .then ((response) => {
      callback(response)
    })
    .catch((error) => {
      callback(error)
    })
  },
  getOrder: (oid, callback) => {
    axios.get(`${DOMAIN}/orders/${oid}/`,{} , {headers: headersFactory() })
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
