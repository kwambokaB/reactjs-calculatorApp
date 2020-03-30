import React, { Component } from 'react'
import Button from './components/button'
import './css/style.css'


export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        current: '0',
        previous: [] ,
        nextIsReset: false    
    }

    this.addtoCurrent = this.addtoCurrent.bind(this)
    this.reset = this.reset.bind(this)
}

reset = () => {
  this.setState({current: '0', previous: [], nextIsReset: false});
}

addtoCurrent(symbol){
//console.log(symbol);
if(["/", "-", "+", "*"].indexOf(symbol) > -1){
  let {previous} = this.state;
  previous.push(this.state.current + symbol);
  this.setState({previous, nextIsReset: true});
}else{
  
  if((this.state.current === "0" && symbol !== ".") || this.state.nextIsReset){
    this.setState({current: symbol, nextIsReset: false});
  }else{
    this.setState({current: this.state.current + symbol});
  }
}
}
  calculate = (symbol) => {
    let {current, previous, nextIsReset} = this.state;
    if(previous.length > 0){
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({current, previous: [], nextIsReset: true});
    }
}


  render() {
    const buttons = [
      {symbol:'C', col:3, action: this.reset},
      {symbol:'/', col:1, action: this.addtoCurrent},
      {symbol:'7', col:1, action: this.addtoCurrent},
      {symbol:'8', col:1, action: this.addtoCurrent},
      {symbol:'9', col:1, action: this.addtoCurrent},
      {symbol:'*', col:1, action: this.addtoCurrent},
      {symbol:'4', col:1, action: this.addtoCurrent},
      {symbol:'5', col:1, action: this.addtoCurrent},
      {symbol:'6', col:1, action: this.addtoCurrent},
      {symbol:'-', col:1, action: this.addtoCurrent},
      {symbol:'1', col:1, action: this.addtoCurrent},
      {symbol:'2', col:1, action: this.addtoCurrent},
      {symbol:'3', col:1, action: this.addtoCurrent},
      {symbol:'+', col:1, action: this.addtoCurrent},
      {symbol:'0', col:2, action: this.addtoCurrent},
      {symbol:'.', col:1, action: this.addtoCurrent},
      {symbol:'=', col:1, action: this.calculate}
    ]
    return (
      <div className="App">
      {this.state.previous.length > 0 ?
          <div className="floaty-last">{this.state.previous[this.state.previous.length - 1]}</div>
        : null}
      <input className="result" type="text" value={this.state.current} />
      {buttons.map((btn, i)=>{
        return <Button  key={i} symbol={btn.symbol} col={btn.col} action={(symbol)=> btn.action(symbol)} />
      })}
      </div>
    )
  }
}
