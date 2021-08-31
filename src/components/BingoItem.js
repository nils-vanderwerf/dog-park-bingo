import React from 'react'
import { Grid } from '@material-ui/core';
export default class BingoItem extends React.Component{
    constructor(props){
      super(props);

    }

    render(){
      return(
        <Grid item className="square" align-items="center"
          onClick={(e) => this.props.handleClick(e)}>
                <span class="text-content"></span>
        </Grid>
      );
    }
  }