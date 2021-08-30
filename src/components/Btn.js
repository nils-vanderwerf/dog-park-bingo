import React from 'react'
export default class Btn extends React.Component{
    constructor(props){
      super(props);
      
      if(undefined != this.props.handle)
        this.handleClick = this.props.handle.bind(this);
      else
        this.handleClick = () => {};
    }
    render(){
      let status = '';
      if(this.props.active == true){
        status = 'active';
      }
      if(this.props.lined == true){
        status = 'lined';
      }
      return(
        <div className={"btn " + status} 
          onClick={(e) => this.handleClick(this.props.position)}
        >
          {(this.props.slots != 0) ? this.props.slots : <span className="black">&nbsp;</span>}
        </div>
      );
    }
  }