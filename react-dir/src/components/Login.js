import React, { Component } from 'react';
import { Button, Form, Message, Icon, Grid, Header, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {Email: '',password:'',errmsg:''};

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeEmail(event) {
    this.setState({Email: event.target.value});
   
  }


  handleChangePass(event) {
    this.setState({password: event.target.value});
  }


  handleSubmit(event) {
    console.log('UserName and Pass are  submitted: ' + this.state.Email+this.state.password);
       //if data incorrect show in errmsg
    if(this.state.Email ==''||this.state.password=='')
    {
      this.setState({errmsg: 'Email and password are required'});
    }else
    {
          //send data to backend
          let form=document.getElementById('loginform');
          let data = new FormData(form);
          console.log(data.get('usermail'));
          // Display the values
          for (var value of data.values()) {
            console.log(value); 
          }

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
      columns={6}
      >
      <Grid.Column computer={5}>
        <Header as='h2' color='teal' textAlign='center'>
          {/* <Image src='/logo.png' /> */}
          {' '}Yalla notlob
        </Header>

        <Form size='large' onSubmit={this.handleSubmit} id='loginform'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              type='email'
              name='usermail'
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

            <Button color='teal' fluid size='large'>Login</Button>
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

        <Message>
          New to us?<Link to="/register"> Sign Up</Link>
          <br/>
          forget your password?<Link to="/forgetpassword">here</Link>
        </Message>
        
        <Grid.Row>
        <Message> 
        <Grid.Column  computer={2}>
            
            <Button color='facebook' fluid >
                    <Icon name='facebook' /> Facebook
            </Button>
            <br/>
          
            <Button color='google plus' fluid >
                    <Icon name='google plus' /> Google 
            </Button>
          
        </Grid.Column>
        </Message>
        </Grid.Row>
      </Grid.Column>
    </Grid>      
      <br/>
    

    </div>
  
    );
  }
}