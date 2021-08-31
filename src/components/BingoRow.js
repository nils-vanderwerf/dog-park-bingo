import React, { Component } from 'react'
import BingoItem from './BingoItem'
import { FormRow } from '@material-ui/core';

export default class BingoRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowItems:this.props.row
        }
    }
    render() {
        return (
            <div className="bingo-row">
                {this.state.rowItems.map(i => 
                <BingoItem 
                    alignItems="center" 
                    justifyContent="center" 
                    item={i}/>
                )
                }
            </div>
        )
    }
}
