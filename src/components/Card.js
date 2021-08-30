import React, { Component } from 'react'
import Btn from './Btn'
import '../App.css'

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dimension: this.props.dimension
        }
    }
    render() {
        const {dimension} = this.state
        console.log("CARD", this.state.slots)
        const slots = this.props.slots.map((slot, i) => <p>{slot}</p>)
        console.log("DOG CARDS", slots)

        return (
            <div style={{
                display: 'block',
                width: 50 * dimension,
                height: 50 * dimension
            }} className="group">
                {slots}
            </div>
        )
    }
}
