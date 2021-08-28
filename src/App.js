import React, { Component } from 'react'
import {dogBingoOptions} from './constants/dogBingoOptions'
let dimension = 4;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: new Array(dimension * dimension).fill(0),
      picked: [],
      result: [],

    }
  }
  render() {

    return (
      <div>
        <h1>{dogBingoOptions.length}</h1>
      </div>
    )
  }
}