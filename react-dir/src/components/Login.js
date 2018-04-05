import React, { Component } from 'react';
import GridColumn, { Button, Form, Message, Icon, Label, Input, Grid, Header, Image, Segment } from 'semantic-ui-react'
import GridRow from 'semantic-ui-react';


class Login extends React.Component {
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
      //this.setState({errmsg: 'invalid usr mail'});
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

        <Form size='large' onSubmit={this.handleSubmit}>
          <Segment stacked>
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

            <Button color='teal' fluid size='large'>Login</Button>
          </Segment>
        </Form>

        <Message>
          New to us? <a href='#'>Sign Up</a>
          <br/>
          forget your password?<a href='#'>here</a>
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
      
      {/* <form success onSubmit={this.handleSubmit}>
       
           <Input label='Email'  type='email' placeholder='joe@schmoe.com' value={this.state.Email} onChange={this.handleChangeEmail} required />
            <br/>
            <br/>
            <Input label='Password ' type="password" value={this.state.password} onChange={this.handleChangePass} required/>
            <br/>
            <br/>
            <Button color='blue'>Login</Button>
            <br/>
            <br/>
            <label basic color='red' pointing>{this.state.errmsg}</label>
      </form> */}
      
      <br/>
    

    </div>
  
    );
  }
}

export default Login;
