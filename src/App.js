import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import LoginRegister from './LoginRegister'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <div>
            <h1>Localized</h1>
            <LoginRegister/>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}




export default App;
