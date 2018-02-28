import React, { Component } from 'react';
import './ListItems.css';

class ListItems extends Component {
	constructor(props) {
		super(props);
	}
	convertTime(time){

		let timestamp = new Date(time*1000);
    	return(timestamp.toLocaleString());
	}
	innerText(item,index){
		document.getElementById('title_'+index).innerHTML=(item.selftext === '') ? item.title : item.selftext;
		document.getElementById('title_'+index).className=(item.selftext === '') ? 'title' : 'selftext';	
	}
	outerText(item,index){
		document.getElementById('title_'+index).innerHTML=item.title;
		document.getElementById('title_'+index).className='title';	
	}
	openInNewTab(url) {
	  	var win = window.open(url, '_blank');
	}


	render(){

		console.log(this.props.titles)
	    return(
	      	this.props.titles.map((item, index) => 
	        	<div className='listItem' onClick={() => {this.openInNewTab('https://www.reddit.com'+item.permalink)}} tabIndex={2+index}>
	        		<img className='thumbnail' src={item.thumbnail.match(/(\.jpg|\.png|\.jpeg)$/) ? item.thumbnail : 'http://i.imgur.com/sdO8tAw.png'} alt={item.title + ' image'}/> 
     				<p
     					onMouseEnter={() => (this.innerText(item,index))}
     					onMouseLeave={() => (this.outerText(item,index))}
     					className='title'
						id={'title_' + index}
						key={'key_' + index}
 					>
 						{item.title}
     				</p>
         			<p className='author'>Author: {item.author} </p>
         			<p className='comments'>Comments: {item.num_comments} </p>
         			<p className='time'> Time: {this.convertTime(item.created)}</p>
 			        <br />
	        	</div>
	     	)
	    )
	    
  	}	
}
export default ListItems;