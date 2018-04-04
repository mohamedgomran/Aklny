import React, { Component } from 'react';
import { Button, Form, Message, Icon, Label, Input, Grid, Header, Image, Segment} from 'semantic-ui-react'


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
    console.log(event.target.value);
    // this.setState({image: event.target.value});
  }


  handleSubmit(event) {
    console.log('register data: ' + this.state.username+this.state.password+' '+this.state.confirmpass+' '+this.state.Email);
     if(this.state.password != this.state.confirmpass)
     {
         this.setState({errmsg:'invalid Password'});

     }else{
       //send data to backend
       console.log('image',this.state.image);
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
          {/* <Image src='/logo.png' /> */}
          {' '}Registeration
        </Header>
        <Form size='large' onSubmit={this.handleSubmit}>
          <Segment stacked>
          <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='User Name'
              value={this.state.username} onChange={this.handleChangeName} required 
            />

            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={this.state.Email} onChange={this.handleChangeEmail} required 
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
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
              icon='lock'
              iconPosition='left'
              placeholder='Upload Image'
              type='file'
              value={this.state.image} onChange={this.handleChangecimage} required
            />

            <Button color='teal' fluid size='large'>Register</Button>
          </Segment>
        </Form>
        <label>
        {this.state.errmsg}
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

