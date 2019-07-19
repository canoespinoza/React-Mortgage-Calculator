import React from 'react';

export default class App extends React.Component {
  constructor(){ //sets the initial state of all the data you'll be using
    super();
     this.state = { //initial set
      balance : '',
      rate : '',
      term : 15,
      output : null
     };
     this.handleChange = this.handleChange.bind(this);    //these make the functions able to be called (binded) to other elements later in your code
     this.handleCalculate = this.handleCalculate.bind(this);
     this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) { //function that allows for things to be updated later in the code
      this.setState({ [event.target.name] : event.target.value }); //This is getting a previously defined state based on the NAME and giving it a new VALUE/ resetting the state based on input from form
    }
    
    handleCalculate(balance, rate, term){ //this does the actual calculation for the mortgage, must have right params passed through it
        balance = this.state.balance; //must call these to get the values from the onChange(data entered on input form)
        rate = this.state.rate; //^^
        term = this.state.term; //^^
        const n = term * 12; //mortgage math...
        const r = rate / 1200;
        const top = r * (1 + r) ** n;
        const bottom = (r + 1) ** n -1;
        let payment = (balance * (top / bottom)).toFixed(2);
     return payment //returns final mortgatepayment calc
    }

    handleClick(event){
      event.preventDefault(); //prevents default action from happening. In this case, stops input fields from resetting after 'calculate' is clicked
        var result = this.handleCalculate()
        console.log(result)
        this.setState({ output: `${result} is your payment` }) //links output field to the result of the calculate function
    }

  render() { //uses Bootstrap to format the HTML i.e form-horizontal, form-group, form-control
    return (
        <div className='container'> 
          <form className='form-horizontal'> 
          <h3>Mortgage Calculator</h3> 
          <div className='form-group'>
          Loan Balance $<input 
                type='number' 
                name='balance'
                value={this.state.balance} //this assigns the value from the input field to the state and applies it across the whole react component
                className='form-control'
                onChange={this.handleChange} //this makes sure the state changes and updates when modified by the user
            />
          Interest Rate %<input 
                type='number' 
                name='rate'
                value={this.state.rate} 
                className='form-control'
                step='0.01' 
                onChange={this.handleChange}
            />
          Term in Years<select 
                name='term' 
                className='form-control' 
                value={this.state.term}
                onChange={this.handleChange}
          >
            <option value='15'>15</option>
            <option value='30'>30</option>
          </select>
          </div>
          <button 
                name='submit' 
                className='form-control' 
                onClick={this.handleClick}>Calculate
          </button>
          <div 
              name='output' 
              onChange={this.handleChange}
              className='form-control' 
              id='output'
          > {this.state.output}       
          </div>
          </form>
        </div> 
    )
  }
}
