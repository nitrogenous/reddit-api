import React,{ Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id='SearchBar' className='searchBar'>
				<input type='text' placeholder='Subreddit Name' id='input' tabIndex='1' />
				<button id='button' value='Search' onClick={() => {this.props.getInputs(document.getElementById('input').value);}}>Search</button>
				<label id='coolButton' for='button' tabIndex='2'>Search </label>
			</div>
		);
	}
}
export default SearchBar;