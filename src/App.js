import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import LoginRegister from './LoginRegister'
import LocalizedContainer from './LocalizedContainer'
// import { Grid } from 'semantic-ui-react'
import './App.css';


class App extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      message: '',
      showMessage: false,
      loggedIn: true
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
        showMessage: true
      })
  }

  login = async (loginInfo) => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'
    const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const loginJSON = await response.json()
    console.log(loginJSON);

    this.setState({
        message: loginJSON.message,
        showMessage: true,
        loggedIn: true
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
        {
          this.state.loggedIn === false
          ?
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
          :
          <LocalizedContainer />
        }
      </div>
    )
  }
}




export default App;
