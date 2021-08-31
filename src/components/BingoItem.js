import React from 'react'
export default class BingoItem extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        item: this.props.item
      }
    }
    render(){
     
      return(
        <div className="square" align-items="center"
          onClick={(e) => this.handleClick(this.props.idx)}>
                <span class="text-content">{this.state.item}</span>
        </div>
      );
    }
  }