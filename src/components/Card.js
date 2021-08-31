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
      
      const rowsCopy = this.state.rows
      console.log(rowsCopy)

        return (
          <div className="bingo_card">
            <Grid
                container
                direction="row"
                justifyContent="center"
                // alignItems="center"
                className="group"
                item xs={2.5}
            >
                {this.state.rows.map(row => {
                  return (
                  <BingoRow row = {row}/>
                  )
                })}
            </Grid>
            </div>
        )
    }
}
