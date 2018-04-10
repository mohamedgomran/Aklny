import React, { Component } from 'react';
import { Button, Form, Message, Grid, Header, Segment } from 'semantic-ui-react'
import DOMAIN from '../API/domain';
import axios from 'axios';


export default class Forgetpassword extends Component {

  constructor(props) {
      super(props);
      this.state = {Email: '',errmsg:''};

      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChangeEmail(event) {
    this.setState({Email: event.target.value}); 
  }



  handleSubmit(event) {
    console.log('UserName and Pass are  submitted: ' + this.state.Email);
       //if data incorrect show in errmsg
    if(this.state.Email === '')
    {
      this.setState({errmsg: 'Please enter Your Email'});
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

          //***********************send mail to this user 
          axios.post(`${DOMAIN}/users/forget`, data, {
            headers: {
              'Content-Type':  'application/json'
            }
            }).then( (response)=> {
              console.log('forget response ',response);
              if(response.data.success === true)
                 this.setState({errmsg:'check your mail'});
              else
                 this.setState({errmsg:'invalid user  mail'});
             
            })
            .catch( (error)=> {
              console.log(error);
              console.log('err in send mail');
              this.setState({errmsg:'invalid user Mail'});
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
        

            <Button color='teal' fluid size='large'>Reset my password</Button>
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
    
        
        <br/>


      </div>
    
      );
  }
}