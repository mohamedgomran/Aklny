import React, { Component } from 'react';
import { Button, Form, Message,  Grid, Header, Segment} from 'semantic-ui-react'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import FileBase64 from 'react-file-base64';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '',password:'',Email:'',confirmpass:'',errmsg:'',image:'', redirect: false};

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeconfirm = this.handleChangeconfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeName(event) {
    this.setState({username: event.target.value});
  }


  handleChangeEmail(event) {
    this.setState({Email: event.target.value});
   
  }


  handleChangePass(event) {
    this.setState({password: event.target.value});
  }


  handleChangeconfirm(event) {
    this.setState({confirmpass: event.target.value});
  }

  handleChangecimage(event) {
    // console.log('image',event.target.files[0]);
  }

  getFiles = (file)=>{
    console.log('img..............',file.base64)
    this.setState({ image: file.base64 })
    }

  handleSubmit(event) {

     if(this.state.password !== this.state.confirmpass )
     {

      this.setState({errmsg:'invalid Password'});

     }else if(this.state.name === '')
     {
      this.setState({errmsg:'User Name is Required'});
     }
     else if(this.state.Email === '')
     {
      this.setState({errmsg:'Email is'});
     }
     else{
            //send data to backend
             let data = {
               name:this.state.username,
               email:this.state.Email,
               password:this.state.password,
               pic:this.state.image
             }

             console.log('data',data)
      
            axios.post('http://localhost:3000/users', data, {
              headers: {
                'Content-Type': 'application/json'
              }
              }).then( (response)=> {
                
                if(response.data.success)
                {
                  this.setState({ redirect: true });
                 }else
                 {
                  this.setState({ errmsg: response.data.message });
                  // redirect to login
                 }
                   
                
              })
              .catch( (error)=> {
                this.setState({errmsg:'invalid user data'});
              });
            
/**
 //send data to backend
            let form=document.getElementById('registerform');
            let data = new FormData(form);
      
            axios.post('http://localhost:3000/users', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
              }).then( (response)=> {
                  this.setState({ redirect: true });
                  // redirect to login   
                
              })
              .catch( (error)=> {
                this.setState({errmsg:'invalid user data'});
              });
             
 */
     }
    event.preventDefault();
  }


  render() {

    const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/login'/>;
      }

    return (
        
      <div  className='login-form'>
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
      >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {' '}Registeration
        </Header>
        <Form size='large' onSubmit={this.handleSubmit} id ='registerform'>
          <Segment stacked>
          <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='User Name'
              name='name'
              value={this.state.username} onChange={this.handleChangeName} required 
            />

           

            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              type='email'
              name='email'
              value={this.state.Email} onChange={this.handleChangeEmail} required 
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              value={this.state.password} onChange={this.handleChangePass} required
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              value={this.state.confirmpass} onChange={this.handleChangeconfirm} required
            />
              <Form.Field required>             
                        <FileBase64 multiple={ false } onDone={ this.getFiles }/>
                        
              </Form.Field>
            {/* <Form.Input
              fluid
              icon='upload icon'
              iconPosition='left'
              placeholder='Upload Image'
              type='file'
              name='userimage'
              onChange={this.handleChangecimage} required
            /> */}

            <Button color='teal' fluid size='large'>Register</Button>
          </Segment>
        </Form>
        <label>
        { this.state.errmsg !== ''?
        <Message
         error
         header=''
         content={this.state.errmsg}
        />
         :''}
        </label>
      </Grid.Column>
    </Grid>
      
    </div>
  
    );
  }
}

