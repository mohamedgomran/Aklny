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
	// addGroup: (name, callback)=>{
	// 	let payLoad = {'name':name}
    //     axios.post('http://localhost:3000/groups', payLoad ,{ headers: headers })
    //       .then((response)=> {
    //         callback(response.data)
    //       })
    //       .catch((error)=> {
    //         callback(error)
    //     })
	// },

};

export default UsersAPI;