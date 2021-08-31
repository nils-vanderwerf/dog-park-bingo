import React, { Component } from 'react'
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
    const gridSquare = this.props.dimension * this.props.dimension
    let card_tiles = [];
    for (let i = 0; i < gridSquare; i++) {
      card_tiles.push(
        <Grid item style={{ width: '20%' }}>
          <BingoItem
            key={i}
            lined={((this.props.hit_lines || []).includes(i))}
            idx={i} slots={this.props.slots}
            handleClick={this.props.handle}
          />
        </Grid>
      )
    }
    // this.props.slots.map((s, i) => 
    // <Grid item style={{width: '20%'}}>
    // <BingoItem key={i} active={ ((this.props.hits || []).includes(s)) } 
    //   lined={ ((this.props.hit_lines || []).includes(i)) }
    //   idx={i} slot={s} 
    //   handle={this.props.handle}
    // />
    // </Grid>

    return (
      <Grid container className="bingo_card" xs={12}>
        {card_tiles}
      </Grid>
    )
  }
}
