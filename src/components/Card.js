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

    createRows = () => {
      const { slots, dimension } = this.props
      console.log("SLOTS", slots)
      for (let i = 0; i < dimension; i++) {
        console.log("DIMENSION, i", dimension, i, "START SLICE", dimension * (i), "END ", dimension * i + (dimension - 1) )
        this.state.rows.push(
          slots.slice(dimension * i, dimension * i + (dimension - 1) ) 
        )
      }
    }


      
    render() {
        const { dimension } = this.state
        const card_rows = this.createRows()

        
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="group"
            >
                {this.state.rows.map(row => {
                  <BingoRow row = {row}/>
                })}
            </Grid>
        )
    }
}
