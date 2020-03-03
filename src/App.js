import React from 'react';
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
      loggedIn: false,
      businessOwner: false,
      business: ''
    }
  }

  // registers a new user
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

  // logs in user after they are registered
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

    // renders 'your business profile' in nav if user logged in owns a business
    // stores business info of user to render profile
    this.setState({
      message: loginJSON.message,
      showMessage: true,
    })

    if (loginJSON.status === 201) {
        if (loginJSON.business !== '') {
          this.setState({
            businessOwner: true,
            business: loginJSON.business
          })
        }
        this.setState({
            loggedIn: true
        })
    }
  }

  // switches message show to be hidden
  hideMessage = (bool) => {
    if (bool === true) {
      this.setState({showMessage: false})
    }
  }



  logout = (bool) => {
    console.log('logout');
    if (bool === true){
      this.setState({
        loggedIn: false,
        businessOwner:false
      })
    }
  }

  // switches user to business owner once they add their business
  // user will then be redirected to their business profile
  renderNewBusiness = (newBusiness) => {
    this.setState({
      business: newBusiness,
      businessOwner: true
    })
  }

 notBusinessOwner = () => {
  this.setState({
    businessOwner: false
  })
 }

 updateUserBusiness = (business) => {
  this.setState({
    business: business
  })
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
          <LocalizedContainer 
          logout={this.logout}
          businessOwner={this.state.businessOwner}
          business={this.state.business}
          renderNewBusiness={this.renderNewBusiness}
          notBusinessOwner={this.notBusinessOwner}
          updateUserBusiness={this.updateUserBusiness}
          />
        }
      </div>
    )
  }
}




export default App;
