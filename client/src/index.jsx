import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [], 
    }
    this.search = this.search.bind(this);
    this.searchToState = this.searchToState.bind(this);
  }
  // id username reponame stars
  componentDidMount(){
    this.getMethod();
  }
  
  getMethod(){
      $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'get',
      success: function(data) {
        let pushToState = [];
        for (let idx = 0; idx < data.length; idx++) {
          let dataToSave = [];
          dataToSave[0] = data[idx].username;
          dataToSave[1] = data[idx].repo;
          dataToSave[2] = data[idx].stargazers_count;
          pushToState.push(dataToSave);
        }
        this.setState({repos: pushToState}, ()=>console.log(this.state));
      }.bind(this)
    })
  }
  
  search (term) {
    //url includes /repos
    console.log(`${term} was searched in top level`);
    // Do the ajax thing!!!!!
    let formattedData = {username: term};
    $.ajax({
        url: 'http://localhost:1128/repos',
        dataType: 'json',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(formattedData),
        success: function(data) {
          this.getMethod();
          // I lost my this binding?!?!?!?!
          //this.setState({repos: data});
        }.bind(this)
    })
  }

  searchToState(data) {
    this.setState({repos:data});
  }
  
  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <Search 
      onSearch={this.search}
      />
      <RepoList repos={this.state.repos}/>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));