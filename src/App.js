import React, { Component } from 'react'
import { dogBingoOptions } from './constants/dogBingoOptions'
import Card from './components/Card'
// import './App.css'
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export let dimension = 4;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: new Array(dimension * dimension).fill(0),
      slots: [],
      rows: [],
      column: [],
      options: dogBingoOptions,
      hits: [],
      prevCompleted: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleGenerateRandom = this.handleGenerateRandom.bind(this)
  }

  handleClick(event) {
    event.target.classList.add("mark-found")
    console.log("TARGET CHILDREN", event.target.lastChild.id)
    this.setState({
      hits: [...this.state.hits, event.target.lastChild.id]
    }, function () { this.checkLine(event.target.lastChild.id) })

  }
  handleClear = () => {
    const textConts = document.querySelectorAll('span.text-content')
    for (let i = 0; i < textConts.length; i++) {
      textConts[i].innerHTML = ""
    }
    //Remove marked from squares
    this.removeMarked()
  }

  removeMarked = () => {
    const squares = document.getElementsByClassName('square')
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove('mark-found', 'mark-line-complete')
    }
  }

  handleGenerateRandom = () => {
    console.log(this.state.options)
    const randCards = this.generateCards(dimension * dimension)
    console.log(randCards)
    this.setState({
      slots: randCards,
    }, function () { this.fillSquares() })
    this.removeMarked()
  }

  fillSquares() {
    const textConts = document.querySelectorAll('span.text-content')
    for (let i = 0; i < textConts.length; i++) {
      textConts[i].setAttribute("id", i)
      textConts[i].innerHTML = this.state.slots[i]
    }
  }

  handleGo() {
    const hit_pool = this.state.hit_pool;
    const hits = hit_pool.slice(0, this.state.hit_step + 1);
    this.setState({
      hits: hits,
      hit_step: this.state.hit_step + 1
    });
  }

  handleClear() {
    this.setState({
      pick: new Array(dimension * dimension).fill(0),
      slots: [],
      result: [],
      nxtNum: 1,
      hits: null,
      hit_pool: this.generateNums(dimension * dimension),
      hit_step: 0
    });
  }

  handleAdd() {
    const pick = this.state.pick;
    let slots = this.state.slots;
    slots.push(pick)
    this.setState({
      slots: slots,
      pick: new Array(dimension * dimension).fill(0),
      nxtNum: 1,
    });
  }

  checkLine(clickedEl) {
    console.log("CLICKED EL", clickedEl)
    const lines = [
      //       [0,1,2,3,4],
      //       [5,6,7,8,9],
      //       [10,11,12,13,14],
      //       [15,16,17,18,19],
      //       [20,21,22,23,24],

      //       [0,5,10,15,20],
      //       [1,6,11,16,21],
      //       [2,7,12,17,22],
      //       [3,8,13,18,23],
      //       [4,9,14,19,24],

      // [0,6,12,18,24],
      // [4,8,12,16,20]
    ];

    let slash1 = [];
    let slash2 = [];

    for (let i = 0; i < dimension; i++) {
      let row = [];
      let col = [];
      for (var o = 0; o < dimension; o++) {
        row.push(o + dimension * i);
        col.push(o * dimension + i);
      }
      lines.push(row);
      lines.push(col);

      slash1.push(i + dimension * i);
      slash2.push((dimension - 1) * (i + 1));
    }
    lines.push(slash1);
    lines.push(slash2);

    const hits = this.state.hits.map(hit => parseInt(hit));

    console.log("PARSE INT HITS", hits)

    console.log(hits, lines)

    for (let i = 0; i < lines.length; i++) {
      //If the hits includes every member of a line
      //and the prev completed array has not been completed before
      if (lines[i].every(c => hits.includes(c)) &&
        !this.state.prevCompleted.includes(i) &&
        this.state.prevCompleted.length < 12) {
        // alert(`LINE ${i} COMPLETE!`)
        this.indicateCompletedLine(lines[i])
        this.setState({
          prevCompleted: [...this.state.prevCompleted, i]
        })
      }
      else if (this.state.prevCompleted.length === 12) {
        alert(`~~~ ALL LINES COMPLETE! YOU WIN! ~~~`)
      }
    }
  }

  indicateCompletedLine = (compLine) => {
    console.log("LINE COMPLETE", compLine)
      compLine.forEach(id => {
        console.log("ID OF COMPLETED", id)
        let targElement = document.getElementById(`${id}`).parentElement
        console.log("TARGETED FINISHED ELEMENT", targElement)
        targElement.classList.add('mark-line-complete')
      })
  }

  generateCards = (max) => {
    //Create pool of spaces
    const pool = Array.apply(null, Array(max + 1)).map(function (_, i) { return i; });
    let arr = [];
    while (arr.length < max) {
      const idx = Math.floor(Math.random() * dogBingoOptions.length)
      const dogEl = dogBingoOptions[idx]
      console.log(idx)
      if (pool[idx] != 0) {
        arr.push(dogEl);
        pool[idx] = 0;
      }
    }
    return arr;
  }

  render() {
    return (
      <div className="container">
        <h1>Bingo</h1>
        <div className="button-container">
          <Button variant="contained" color="primary" onClick={this.handleClear}>Clear</Button>
          <Button variant="contained" color="primary" onClick={this.handleGenerateRandom}>New Card</Button>
        </div>
        <div className="Game__bingo_card">
          <Card
            hits={this.state.hits}
            slots={this.state.slots}
            dimension={dimension}
            handle={this.handleClick}
          />
        </div>
      </div>
    )
  }
}