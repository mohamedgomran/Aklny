import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'





class DropdownExampleMultipleSelection extends React.Component {

  options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
  ]
 defaultSelectedLabel = (e, {value})=>{
  console.log(value)
}


render(){
  return(
    <Dropdown placeholder='Skills' fluid multiple selection options={this.options} onChange={this.defaultSelectedLabel}/>
  )
}

}

export default DropdownExampleMultipleSelection
