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

  componentDidMount(){
    
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
          console.log('data ', data);
          console.log('this ', this);
          // I lost my this binding?!?!?!?!
          this.setState({repos: data}, ()=>console.log(this.state));
        }.bind(this)
    })
  }

  searchToState(data) {
    this.setState({repos:data});
  }
  
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search 
      onSearch={this.search}
      />
      <RepoList repos={this.state.repos}/>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));