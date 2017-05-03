import ReactDOM from 'react-dom';
import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import Routes from 'routes';
import HeaderNav from 'components/header-nav';
import http from 'http'

const history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', () => {

    http.get('/db/user', (res) => {
      let rawData = '';
      
      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        const data = rawData;
        const loggedIn = typeof data === "object";
        const username = data ? data.name : '';
        const userID = data ? data.id : '';

        ReactDOM.render(
          <div id='app'>
            <HeaderNav loggedIn={loggedIn} username={username} />
            <Routes history={history} loggedIn={loggedIn} userID={userID} />
          </div>, 
          document.querySelector('#root')
        );
      });
    });
    
});