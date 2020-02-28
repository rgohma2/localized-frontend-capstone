import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import LoginRegister from './LoginRegister'
import { Message, Grid } from 'semantic-ui-react'
import './App.css';


class App extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      message: '',
      showMessage: false,
      loggedIn: false
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

    const registerJSON = await response.json()
    console.log(registerJSON)

      this.setState({
        message: registerJSON.message,
        showMessage: true,
      })

  }

  login = async (loginInfo) => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'
    const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        // headers: {
        //   'Content-Type': 'application/json'
        // }
    })
    const loginJSON = await response.json()
    console.log(loginJSON);

    this.setState({
        message: loginJSON.message,
        showMessage: true,
      })

  }

  hideMessage = (bool) => {
    if (bool === true) {
      console.log('hello');
      this.setState({
        showMessage: false
      })
    }
  }





  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/'>
              <div>
                <h1>Localized</h1>
                <LoginRegister
                register={this.register}
                login={this.login}
                showMessage={this.state.showMessage}
                message={this.state.message}
                loggedIn={this.state.loggedIn}
                hideMessage={this.hideMessage}
                />
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}




export default App;
