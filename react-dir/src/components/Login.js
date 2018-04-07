import React, { Component } from 'react';
import { Button, Form, Message, Icon, Grid, Header, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import SocialButton from './SocialButton';
import axios from 'axios';

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

  
  handleSocialLogin = (user) => {
    console.log(user)
    console.log(user.profile)

    axios.post('http://localhost:3000/user_token', user.profile, {
      headers: {
        'Content-Type': 'application/json'
      }
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  
 handleSocialLoginFailure = (err) => {
    console.error(err)
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
          
          const body={auth:{"email":data.get('usermail'),"password":data.get('password')}}
          axios.post('http://localhost:3000/user_token',body,{
              headers: {
                'Content-Type': 'application/json'
              }
              
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

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
                    
                    <SocialButton  
                    color='facebook' fluid 
                    provider='facebook'
                    appId='156850814994978'
                    onLoginSuccess={this.handleSocialLogin}
                    onLoginFailure={this.handleSocialLoginFailure}
                    >
                    <Icon name='facebook' /> 
                    Login with Facebook
                  </SocialButton>
            </Button>
            <br/>
          
            <Button color='google plus' fluid >
            {/* 372012466129-l3ap3uobl7qffkq1d135o1eiopqctmpb.apps.googleusercontent.com */}
            {/* w29azHba8hc1zqKHfqJC_tnd */}
                   <SocialButton  
                   
                    provider='google'
                    appId='372012466129-7c90lsva9cs12qgihfc54pk061vecle5.apps.googleusercontent.com'
                    onLoginSuccess={this.handleSocialLogin}
                    onLoginFailure={this.handleSocialLoginFailure}
                    >
                    <Icon name='google plus' /> 
                    Login with Google 
                    </SocialButton>
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