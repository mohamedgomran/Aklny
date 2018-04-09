import axios from 'axios';
let headers = { 
	'Content-Type': 'application/json',
	 'Authorization': 'Bearer ' + localStorage.getItem('token') 
	}

let GroupsAPI = {
	getAllGroups:(callback) =>{
        axios.get('http://localhost:3000/groups', { headers: headers })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	addGroup: (name, callback)=>{
		let payLoad = {'name':name}
        axios.post('http://localhost:3000/groups', payLoad ,{ headers: headers })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	deleteGroup:(id, callback)=>{
        axios.delete(`http://localhost:3000/groups/${id}` ,{ headers: headers })
          .then((response)=> {
          	console.log(response)
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	listMembers:(id, callback)=>{
        axios.get(`http://localhost:3000/groups/${id}/members` ,{ headers: headers })
          .then((response)=> {
          	// console.log(response)
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	deleteMember:(gid, fid, callback)=>{
        axios.delete(`http://localhost:3000/groups/${gid}/members/${fid}` ,{ headers: headers })
          .then((response)=> {
          	// console.log(response)
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	addMember:(gid, email,callback)=>{
		let payLoad = {'email':email}
        axios.post(`http://localhost:3000/groups/${gid}/members/`, payLoad ,{ headers: headers })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},

};

export default GroupsAPI;