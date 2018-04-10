import axios from 'axios';
let headers = { 
    'Content-Type': 'application/json',
    'Authorization':"Bearer "+localStorage.getItem('token')
 }

let UsersAPI={
	getMyNotifications:(callback) =>{
        axios.get('http://localhost:3000/users/notifications', { headers: headers })
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
       axios.get('http://localhost:3000/auth', {headers: headers})
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