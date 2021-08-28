import React, { Component } from 'react'
import Btn from './Btn'

export default class Board extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const dog_cards = this.props.slots.map((n, i) => {
            <Btn active={((this.props.hits || []).includes(n))}
                lined={((this.props.hit_lines || []).includes(i))}
                idx={i} num={n}
                handle={this.props.handle}
            />
        })

        return (
            <div style={{
                width: 50 * dimension,
                height: 50 * dimension
            }} className="group">
                {dog_cards}
            </div>
        )
    }
}
