import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import App from './components/App';
import FirstComponent from './components/FirstComponent';
import CartComponent from './components/Cart';
import Notfound from './components/Notfound';

const Root = () => {
        return (
				<BrowserRouter>
				  <div className="menu-item">
				  <ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/first">Header</Link></li>
					<li><Link to="/cart">Cart</Link></li>
					</ul>
					<Switch>
					
					<Route exact path='/' component={App} />
					<Route path='/first' component={FirstComponent}/>
					<Route path='/cart' component={CartComponent}/>
					<Route component={Notfound} />
					</Switch>
				  </div>
				</BrowserRouter>
			)
    }

render(<Root />, document.getElementById('root'));

/*function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
*/
//prop

/*function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara"/>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
*/
/*
class Mylist extends React.Component{
	constructor(){
		super();
		this.state ={
			firstname:'mukesh',
			lastname: 'singh',
			age:30
		}
	}
 
	render(){
		return(
		<ul>
		<li>{this.state.firstname}</li>
		<li>{this.state.lastname}</li>
		</ul>
		)
	}
}


ReactDOM.render(<Mylist/>,document.getElementById('root')
);
*/
/*
class Mylist extends React.Component{
	constructor(){
		super();
		this.state ={
			firstname:'mukesh',
			lastname: 'singh',
			age:30
		}
	}
 
	render(){
		return(
		<ul>
		<Myitem detail={this.state.firstname}/>
		</ul>
		)
	}
}
class Myitem extends React.Component{
	render(){
		return(
		<li>
		{this.props.detail}
		</li>
		
		)
	}
}

ReactDOM.render(<Mylist/>,document.getElementById('root')
);
*/
/*
class Mylist extends React.Component{
	constructor(){
		super();
		this.state ={
			names:['mukesh', 'singh', 'bangalore']
		}
	}
 
	render(){
		return(
		<ul>
		{
			this.state.names.map(function(name){
				return <Myitem key={name} detail={name}/>
			})
		}
		
		</ul>
		)
	}
}
class Myitem extends React.Component{
	render(){
		return(
		<li>
		{this.props.detail}
		</li>
		
		)
	}
}

ReactDOM.render(<Mylist/>,document.getElementById('root')
);
*/
/*
class Mystatechanges extends React.Component{
	state = {
		name:'Begin Skills'
	}
	
	changeName = () => {
		this.setState({
			
						name:'India is Great'
					
		})
	}
	
	
	
	render(){
		return(
		<div className="myname">
			<button onClick={this.changeName}>Change State </button>
			
			<div>{this.state.name}</div>
		</div>
		)
	}
}

ReactDOM.render(<Mystatechanges/>,document.getElementById('root')
);
*/
/*
class Mystatechanges extends React.Component{
	state = {
		name:'begin'
	}
	
	changeName = (newName) => {
		this.setState({
			
						name:newName
					
		})
	}
	
	render(){
		return(
		<div className="myname">
			<button onClick={() => this.changeName('I am here')}>Here we are using anonumus function </button> 
			<button onClick={this.changeName.bind(this, 'I am Don')}>Thsi is with bind method function </button> 
			<div>{this.state.name}</div>
		</div>
		)
	}
}

ReactDOM.render(<Mystatechanges/>,document.getElementById('root')
);
*/
/*class Mystatechanges extends React.Component{
	state = {
		name:'begin'
	}
	
	changeName = (newName) => {
		this.setState({
						name:newName
		})
	}
	
	changeNamefrominput = (e) => {
		this.setState({
						name:e.target.value
		})
	}
	
	render(){
		return(
		<div className="myname">
			<button onClick={() => this.changeName('I am here')}>Here we are using anonumus function </button> 
			<button onClick={this.changeName.bind(this, 'I am Don')}>Thsi is with bind method function </button> 
			<br/>
			<input type="text" onChange={this.changeNamefrominput} value={this.state.name}/>
			<br/>
			<div>{this.state.name}</div>
		</div>
		)
	}
}

ReactDOM.render(<Mystatechanges/>,document.getElementById('root')
);
*/
//promises

/*function getstudent(){
	return new Promise(function(resolve, reject){
		//resolve();
		setTimeout( ()=> {
			reject();
		}, 500)
	})
}
getstudent().then(success, failure);


function success()
{
	console.log("success");
}

function failure()
{
	console.log("failure");
}
*/