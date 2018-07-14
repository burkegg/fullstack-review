import React from 'react';

const RepoList = (props) => {
  
  
  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    { props.repos.map ( (repo, idx) => {
      return (<div><a href={'https://github.com/' + repo[0] + '/' + repo[1]} key={idx}>{repo[1]}</a> </div>)}   ) }
  </div>
)
}
export default RepoList;