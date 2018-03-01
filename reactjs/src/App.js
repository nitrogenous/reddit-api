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
      this.getTopics(nextState.subreddit,(this.state.subreddit !== nextState.subreddit) ? 15 : nextState.limit);
      this.getDominantColor(nextState.subreddit);
    }
  }

  getDominantColor(subreddit){
    try{
    const t = this;
    console.log(subreddit);
    if((subreddit !== null) && (subreddit !== '')){
      let formdata = new FormData();
      formdata.append('url','https://www.reddit.com/r/'+subreddit+'/about.json');
      this.curl('http://127.0.0.1:8080/redditApp/getJson.php',formdata).then(function(data){
          let parsedData= JSON.parse(data);
          let bannerImg = (parsedData.data.banner_img !== undefined) ? parsedData.data.banner_img : undefined;
          if(bannerImg !== '' && bannerImg !== undefined){
            let formdata = new FormData();
            formdata.append('url',bannerImg);
            t.curl('http://127.0.0.1:8080/redditApp/getDominantColor.php',formdata).then(function(colors){
              let parsedColors = JSON.parse(colors);
              console.log("--themeColor: "+parsedColors.R+parsedColors.G+parsedColors.B);
              var html = document.getElementsByTagName('html')[0];
              html.style.cssText = '--themeColor: '+parsedColors.R+','+parsedColors.G+','+parsedColors.B;
            })
          }
          else{
             var html = document.getElementsByTagName('html')[0];
              html.style.cssText = '--themeColor: 255, 63, 24';
          }
        })
      }
    }
    catch(event){
      console.log(event);
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
  curl(url,formdata,method= 'POST'){
    return fetch(url,{body: formdata,method: method}).then(function(pureData){
      return pureData.text();
    })
  }
  getTopics(subreddit,limit) {
    const t = this;
    console.log(subreddit+' '+this.state.subreddit);
    (this.state.subreddit !== subreddit) ? this.setState({limit: 15,titles: []}) : null;
    if(((subreddit !== null) || (subreddit !== '')) && ((limit !== null) || (limit !== '')) && (this.state.limit < 100 || this.state.subreddit !== subreddit)){
      this.setState({loading: 'inProgress'});
      let formdata = new FormData();
      formdata.append('url','https://www.reddit.com/r/'+subreddit+'/new.json?sort=new&limit='+limit);
      this.curl('http://127.0.0.1:8080/redditApp/getJson.php',formdata).then(function(data){
          let parsedData = JSON.parse(data);
          if(parsedData.data !== undefined){
            let itemList = []
            let items = (parsedData.data.children !== undefined) ? parsedData.data.children : null;
            items.map(i => {
              itemList.push(i.data);
            })
            t.setState({titles: itemList});
            console.log(parsedData);
          }
          t.setState({loading: 'standBy'});
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
      let newLimit = (this.state.limit < 100) ? this.state.limit + 15 : 100;
      this.setState({limit: newLimit});
    } else {
    }
  }
}

export default App;
