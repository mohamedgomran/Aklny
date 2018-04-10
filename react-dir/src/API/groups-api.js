import axios from 'axios';
import DOMAIN from './domain';

let headersFactory = ()=>{
  return {
	'Content-Type': 'application/json',
	 'Authorization': 'Bearer ' + localStorage.getItem('token')
	}
}

let GroupsAPI = {
	getAllGroups:(callback) =>{
        axios.get(`${DOMAIN}/groups`, { headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	addGroup: (name, callback)=>{
		let payLoad = {'name':name}
        axios.post(`${DOMAIN}/groups`, payLoad ,{ headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	deleteGroup:(id, callback)=>{
        axios.delete(`${DOMAIN}/groups/${id}` ,{ headers: headersFactory() })
          .then((response)=> {
          	console.log(response)
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	listMembers:(id, callback)=>{
        axios.get(`${DOMAIN}/groups/${id}/members` ,{ headers: headersFactory() })
          .then((response)=> {
          	// console.log(response)
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},
	deleteMember:(gid, fid, callback)=>{
        axios.delete(`${DOMAIN}/groups/${gid}/members/${fid}` ,{ headers: headersFactory() })
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
        axios.post(`${DOMAIN}/groups/${gid}/members/`, payLoad ,{ headers: headersFactory() })
          .then((response)=> {
            callback(response.data)
          })
          .catch((error)=> {
            callback(error)
        })
	},

};

export default GroupsAPI;
