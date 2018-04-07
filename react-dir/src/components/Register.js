import React, { Component } from 'react';
import { Button, Form, Message, Icon, Label, Input, Grid, Header, Image, Segment} from 'semantic-ui-react'
import axios from 'axios';
// import Form from 'react-validation/build/form';
// import Input from 'react-validation/build/input';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '',password:'',Email:'',confirmpass:'',errmsg:'',image:''};

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
    console.log('image',event.target.files[0]);
  }

  handleSubmit(event) {
    console.log('register data: ' + this.state.username+this.state.password+' '+this.state.confirmpass+' '+this.state.Email);
     if(this.state.password != this.state.confirmpass )
     {

      this.setState({errmsg:'invalid Password'});

     }else if(this.state.name=='')
     {
      this.setState({errmsg:'User Name is Required'});
     }
     else if(this.state.Email=='')
     {
      this.setState({errmsg:'Email is'});
     }
     else{
            //send data to backend
            let form=document.getElementById('registerform');
            let data = new FormData(form);
            console.log(data.get('userimage'));
            // Display the values
            for (var value of data.values()) {
              console.log(value); 
            }
            
            axios.post('http://localhost:3000/users', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
              }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            /**
             * axios.post('/user', {
                firstName: 'Fred',
                lastName: 'Flintstone'
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
             */

     }
    event.preventDefault();
  }


  render() {
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
              name='username'
              value={this.state.username} onChange={this.handleChangeName} required 
            />

           

            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              type='email'
              name='useremail'
              value={this.state.Email} onChange={this.handleChangeEmail} required 
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='userpass'
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

            <Form.Input
              fluid
              icon='upload icon'
              iconPosition='left'
              placeholder='Upload Image'
              type='file'
              name='userimage'
              onChange={this.handleChangecimage} required
            />

            <Button color='teal' fluid size='large'>Register</Button>
          </Segment>
        </Form>
        <label>
        { this.state.errmsg !=''?
        <Message
         error
         header=''
         content={this.state.errmsg}
        />
         :''}
        </label>
      </Grid.Column>
    </Grid>
      
      {/* <form success onSubmit={this.handleSubmit}>
      
           <Input label='Name'  type='text' placeholder='User Name' value={this.state.username} onChange={this.handleChangeName} required />
            <br/>
            <br/>
           <Input label='Email'  type='email' placeholder='joe@schmoe.com' value={this.state.Email} onChange={this.handleChangeEmail} required />
            <br/>
            <br/>
            <Input label='Password ' type="password" value={this.state.password} onChange={this.handleChangePass} required/>
            <br/>
            <br/>
            <Input label='Confirm Password ' type="password" value={this.state.confirmpass} onChange={this.handleChangeconfirm} required/>
            <br/>
            <br/>
            <Button color='blue'>Register</Button>
            <br/>
            <br/>
            <label basic color='red' pointing>{this.state.errmsg}</label>
      </form>
       */}
      

    </div>
  
    );
  }
}

