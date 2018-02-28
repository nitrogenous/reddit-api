import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import ListItems from './components/ListItems';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      subreddit: '',
      titles: [],
      limit: 15,
      loading: 'standBy'
    }

  }
  componentWillUpdate(nextProps, nextState) {
    if((nextState.subreddit !== this.state.subreddit) || (nextState.limit !== this.state.limit)){
      this.curl(nextState.subreddit,nextState.limit);
    }
  }

  getDominantColor(img){
    const t = this;
    console.log(img);
    if((img !== null) || (img !== '')){
      let formdata = new FormData();
      formdata.append('img',img);
      fetch('http://127.0.0.1:8080/getDominantColor.php',{body: formdata,method: 'POST'}).then(function(dominantColor){
        console.log(dominantColor);
      })
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  render() {
    return (
      <div id="App">
        <SearchBar getInputs={this.setSubreddit.bind(this)}/>
        <ListItems titles={this.state.titles} />
        <center>
          <img src='http://superstorefinder.net/support/wp-content/uploads/2018/01/blue_loading.gif' className={this.state.loading} /> 
        </center>
      </div>
    );
  }

  setSubreddit(param){
    this.setState({subreddit: param});

  }

  curl(subreddit,limit) {
    const t = this;
    console.log(subreddit);
    if(((subreddit !== null) || (subreddit !== '')) && ((limit !== null) || (limit !== ''))){
      t.setState({loading: 'inProgress'})
      let formdata = new FormData();
      formdata.append('url','https://www.reddit.com/r/'+subreddit+'/new.json?sort=new&limit='+limit);
      fetch('http://127.0.0.1:8080/getJson.php',{body: formdata,method: 'POST'}).then(function(pureData){
        return pureData.text();
      }).then(function(data){
          let parsedData = JSON.parse(data);
          if(parsedData.data !== undefined){
            let itemList = []
            let items = (parsedData.data.children !== undefined) ? parsedData.data.children : null;
            items.map(i => {
              itemList.push(i.data);
            })
            t.setState({titles: itemList, loading: 'standBy'});
            console.log(parsedData);
          }
      })
    } 
  }
  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      let newLimit = this.state.limit + 15;
      this.setState({limit: newLimit});
    } else {
    }
  }
}

export default App;
