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
    });
  }
  
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search 
      onSearch={this.search.bind(this)}
      />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));