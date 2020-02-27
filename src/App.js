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


class App extends React.Component {
  constructor(props) {

    super(props)

    this.state = {

    }

  }

  register = async (registerInfo) => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'
    const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
    })

    const responseJSON = await response.json()
    console.log(responseJSON)

  }

  login = async (loginInfo) => {

  }





  render(){
    return (
      <Router>
        <Switch>
          <Route path='/'>
            <div>
              <h1>Localized</h1>
              <LoginRegister
              register={this.register}
              />
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}




export default App;
