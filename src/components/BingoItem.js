import React from 'react'
export default class BingoItem extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        slot: this.props.item
      }
    }
    render(){
     
      return(
        <div className="square" xs={3} align-items="center"
          onClick={(e) => this.handleClick(this.props.idx)}>
                <span class="text-content">{this.props.slot}</span>
        </div>
      );
    }
  }