import axios from 'axios';
import DOMAIN from './domain';
let headers = { 
    'Content-Type': 'application/json',
    'Authorization':"Bearer "+localStorage.getItem('token')
 }

let UsersAPI={
	getMyNotifications:(callback) =>{
        axios.get(`${DOMAIN}/users/notifications`, { headers: headers })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	getuserdata: (callback) => {
    if(localStorage.getItem('token') !== null)
    {
       axios.get(`${DOMAIN}/auth`, {headers: headers})
        .then( (response)=> {
          console.log(response.data.user);
          callback(response);
        })
        .catch((error)=> {
          callback(error);
        });
     }
   }
};

export default UsersAPI;