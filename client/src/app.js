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

render(){
return (

	<h1>Hello</h1>		
	)	
}
}

ReactDOM.render(<App />, document.getElementById('app'));