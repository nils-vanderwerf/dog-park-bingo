import React, { Component } from 'react'
import BingoRow from './BingoRow';
import BingoItem from './BingoItem'
import { Grid } from '@material-ui/core';

import '../App.css'

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }

        this.createRows = this.createRows.bind(this)
    }

    componentDidMount() {
      let bingoRows = this.createRows()
      this.setState({
        rows: bingoRows,
      })
    }

    createRows = () => {
      const { slots, dimension } = this.props
      console.log("SLOTS", slots)
      let bingoRows = [];
      for (let i = 0; i < dimension; i++) {
        bingoRows[i] = slots.slice(dimension * i, dimension * i + dimension)
      }
     return bingoRows
      }
      
    render() {
      const card_tiles = this.props.slots.map((s, i) => 
      <Grid item style={{width: '20%'}}>
      <BingoItem key={i} active={ ((this.props.hits || []).includes(s)) } 
        lined={ ((this.props.hit_lines || []).includes(i)) }
        idx={i} slot={s} 
        handle={this.props.handle}
      />
      </Grid>
    );

        return (
          <Grid container className="bingo_card" xs={12}>
                {card_tiles}
            </Grid>
        )
    }
}
