import React, { Component } from "react";
import Button from "./components/Button"; //import the button component
import "./css/styles.css"; //import the custome styling css file

class App extends Component {
  //always extend component
  constructor(props) {
    //instantiate the main class
    super(props); //extend the methods of the Parent Class

    this.state = {
      //set the state
      current: "0", //used for main calculator display
      previous: [], //for heads up display -floaty
      nextIsReset: false, //used to clear screen when opertors are clicked
    };
  }

  //method for clearing all data when "C" is clicked
  reset = () => {
    this.setState({
      current: "0",
      previous: [],
      nextIsReset: false,
    });
  };

  //main function
  addToCurrent = (symbol) => {
    //recieves symbol prop from button clicked
    if (["/", "-", "*", "+"].indexOf(symbol) > -1) {
      //test ot check if operator is clicked
      let { previous } = this.state;
      previous.push(this.state.current + symbol); //data pushed in array if operator clicked
      this.setState({ previous, nextIsReset: true });
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") || //display number instead of 0
        this.state.nextIsReset //state set when operator is clicked to clear screen
      ) {
        this.setState({ current: symbol, nextIsReset: false });
      } else {
        this.setState({
          current: this.state.current + symbol, //esle display whats clicked
        });
      }
    }
  };

  //The calculate method uses an unsafe "eval" method and needs to be changed
  calculate = (symbol) => {
    let { current, previous, nextIsReset } = this.state;
    if (previous.length > 0) {
      //if something is in the previous array
      //basically evaluates the string. Very unsafe and code need to be modified
      current = eval(String(previous[previous.length - 1] + current)); //unsafe
      this.setState({
        current,
        previous: [],
        nextIsReset: true,
      });
    }
  };

  render() {
    //buttons to be rendered
    //each object with symbol key, columns and action method
    //notable are the reset and the calculate methods on some buttons
    const buttons = [
      { symbol: "C", cols: 3, action: this.reset },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate },
    ];
    return (
      <div className="App">
        {this.state.previous.length > 0 ? (
          <div className="floaty-last">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}
        <input className="result" type="text" value={this.state.current} />
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              symbol={btn.symbol}
              cols={btn.cols}
              action={(symbol) => btn.action(symbol)}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
