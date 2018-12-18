import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			results:[],
			string:''
		}
	}

	cal(string){ 

		//credits of this function goes to 200-success and CodeYogi users on stachexchange
		let findClosingBracketIndex = (str, pos) => {
			  if (str[pos] != '(') {
			    throw new Error("No '(' at index " + pos);
			  }
			  let depth = 1;
			  for (let i = pos + 1; i < str.length; i++) {
			    switch (str[i]) {
			    case '(':
			      depth++;
			      break;
			    case ')':
			      if (--depth == 0) {
			        return i;
			      }
			      break;
			    }
			  }
			  return -1;    // No matching closing parenthesis
			}

		let operate = (val1,val2,operation) =>{
			if(operation == '*') return val1 * val2;
			if(operation == '+') return val1 + val2;
			if(operation == '-') return val1 - val2;
			if(operation == '/') {
				if(val2 == 0) return "division by 0 is undefined";
				return val1 / val2;
			}
		}
		let result = 0, arr = [], integer;
		string = string.replace(/ /g,'');
		let opertions = {
			'×' : {symbol:'*',p:2},
			'*' : {symbol:'*',p:2},
			'+':  {symbol:'+',p:1}, 
			'-':  {symbol:'-',p:1},
			'÷' : {symbol:'/',p:2},
			'/' : {symbol:'/',p:2}
		}
		while(string.length){
			if(string[0] == '(')
				{
					let closingIndex = findClosingBracketIndex(string,0);
					if(closingIndex == -1 ) return "Unbalanced Brackets"
					let res = this.cal(string.substring(1,closingIndex));
			        if (isNaN(res)) return res;
					arr.push(res);
					string = string.substring(closingIndex+1,string.length);
				}
			else {
					integer = parseFloat(string, 10);
					if(isNaN(integer)) return "non-numeric inputs"
					arr.push(integer)
					string = string.slice((''+integer).length, string.length);
				}
			if(string[0]){
					if(!opertions[string[0]]) return "unknown operation"
						arr.push(opertions[string[0]]);
						string = string.slice(1);
				}
		}
		if(arr.length< 3) return "invalid operation"
		let index = 1;
		while(arr.length > 3){
			if(arr[index].p >= arr[index+2].p)
			{
				let res = operate(arr[index-1],arr[index+1],arr[index].symbol)
				if (isNaN(res)) return res;
				arr.splice(index-1, 3);
				arr.splice(index-1,0,res);
			}

			else {

				let res = operate(arr[index+1],arr[index+3],arr[index+2].symbol);
				if (isNaN(res)) return res;
				arr.splice(index+1, 3);
				arr.splice(index+1,0,res);
			}
		}
		return  operate(arr[0],arr[2],arr[1].symbol);
		
	}

	render(){
		let displayResults = this.state.results.map((name,index) =>{
                        return <li key={index}>{name.string} &nbsp; &nbsp; = &nbsp; &nbsp; &nbsp;{name.result}</li>;
                      })
		return (
		<div className="container" >
			<h4>Calculator</h4>
		<ul>{ displayResults }</ul>
				<input 
				type="text" 
				value={this.state.string} 
				onChange={ (e)=> {this.setState({string:e.target.value}) } }
				placeholder="Type an expression to be calculated"
				onKeyDown={(e) => {
					if(e.keyCode == 13){
					let arr1= this.state.results;
					let res =  this.cal(this.state.string)
				if (isNaN(res)) this.setState({string: this.state.string+ " "+res});
					else {arr1.push({string: this.state.string, result: res}); 
			 		this.setState({results:arr1, string:''})}
			 	}
				}}
				/> <br/>

		</div> 
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));