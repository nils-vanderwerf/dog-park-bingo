import React from 'react'
import { Grid } from '@material-ui/core';
import { Textfit } from 'react-textfit';

export default class BingoItem extends React.Component{
    constructor(props){
      super(props);

    }

    render(){
      return(
        <Grid item className="square" align-items="center"
          onClick={(e) => this.props.handleClick(e)}>
                <span class="text-content" style={{fontSize: this.props.dimension <= 6 ? '20px' : '16px'}}></span>
        </Grid>
      );
    }
  }