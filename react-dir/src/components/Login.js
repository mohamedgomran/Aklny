import React, { Component } from 'react';
import { Button, Form, Message, Icon, Grid, Header, Segment } from 'semantic-ui-react';
import { Link,Redirect } from "react-router-dom";
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

  // handleLoginerr(){
  //   this.setState({errmsg:"invalid user mail or passwprd"});
  // }

  handleChangeEmail(event) {
    this.setState({Email: event.target.value});
   
  }


  handleChangePass(event) {
    this.setState({password: event.target.value});
  }

  
  handleSocialLogin = (user) => {
    console.log(user)
    console.log(user.profile)
    var body={
      name:user.profile.name,
      email:user.profile.email,
      img:user.profile.profilePicURL,
      password:'social'
    }

    console.log('bbbbbbbbbbb',body);

    axios.post('http://localhost:3000/users',body, {
      headers: {
        'Content-Type': 'application/json'
      }
      }).then(function (response) {
        console.log('Social User Added',response);
        //get user token
        const b={auth:{"email":body.email,"password":body.password}}
        axios.post('http://localhost:3000/user_token',b,{
            headers: {
              'Content-Type': 'application/json'
            }
            
          }).then(function (response) {
              console.log(response);
              console.log(response.data.jwt);
              localStorage.setItem('token',response.data.jwt)
              //request to get User data 
              axios.get('http://localhost:3000/auth', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':"Bearer "+localStorage.getItem('token')
                }
                }).then(function (response) {
                  console.log(response);
                  console.log('user data in social login',JSON.stringify(response.data.user));
                  console.log(localStorage.getItem('token'));
                  localStorage.setItem('user',JSON.stringify(response.data.user))
                  var u=localStorage.getItem('user')
                  console.log('User from local storage',JSON.parse(u))
                  return <Redirect to="/"/>
                })
                .catch(function (error) {
                  console.log(error);
                });


            })
            .catch(function (error) {
              console.log(error);
            });
      })
      .catch(function (error) {
        console.log(error);
        console.log('Social Login error ',error);
        this.setState({errmsg:"invalid Social Login"})
      });
    
    


  }
  
 handleSocialLoginFailure = (err) => {
    console.error(err)
  }




  handleSubmit(event) {
    console.log('UserName and Pass are  submitted: ' + this.state.Email+this.state.password);
       //if data incorrect show in errmsg
    if(this.state.Email === ''||this.state.password === '')
    {
      this.setState({errmsg: 'Email and password are required'});
    }else
    {
          //send data to backend
          let form=document.getElementById('loginform');
          let data = new FormData(form);
          console.log(data.get('email'));
          // Display the values
          for (var value of data.values()) {
            console.log(value); 
          }
          
          const body={auth:{"email":data.get('email'),"password":data.get('password')}}
          axios.post('http://localhost:3000/user_token',body,{
              headers: {
                'Content-Type': 'application/json'
              }
              
            }).then(function (response) {
                console.log('Login res status',response.status);
                console.log(response.data.jwt);
                if(response.status == '201'){
                localStorage.setItem('token',response.data.jwt)
                //request to get User data 
                axios.get('http://localhost:3000/auth', {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization':"Bearer "+localStorage.getItem('token')
                  }
                  }).then(function (response) {
                    console.log(response);
                    console.log(response.data.user);
                    console.log(localStorage.getItem('token'));
                    localStorage.setItem('user',JSON.stringify(response.data.user))
                    var u=localStorage.getItem('user')
                    console.log('User from local storage',JSON.parse(u))
                    return <Redirect to="/"/>
                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });


              
                }})
              .catch(function (error) {
                console.log('Login error ',error);
                // this.setState({errmsg:"invalid user mail or passwprd"});
                
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

            <Button color='teal' fluid size='large'>Login</Button>
          </Segment>
        </Form>

        <label>
        { this.state.errmsg !==''?
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
                    appId='372012466129-8uv0cpjq7v3cforvq0evfq2vl9v0f9sd.apps.googleusercontent.com'
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