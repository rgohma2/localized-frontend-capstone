import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import './index.css'
import { Form, Button, Grid, Segment, Message} from 'semantic-ui-react'

class LoginRegister extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			address_1: '',
			address_2: '',
			city: '', 
			state: '', 
			zip_code: '', 
			country: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleRegisterSubmit = (event) => {
		event.preventDefault()
		this.props.register(this.state)
		this.clearForm()
	}
	handleLoginSubmit = (event) => {
		event.preventDefault()
		this.props.login(this.state)
		this.clearForm()
	}

	clearForm = () => {
		this.setState({
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			address_1: '',
			address_2: '',
			city: '', 
			state: '', 
			zip_code: '', 
			country: ''
		})
	}

	render() {
		return(
			<Grid
			className="center aligned"
			style={{
				backgroundImage: `url(https://www.reachabovemedia.com/wp-content/uploads/2019/03/optimisation-google-my-business.jpg})`,
				height: '800px'
			}}
			>
			<Router>
				<Switch>
					<Route path='/register'>
						<div 
						style={{
							marginTop: '50px'
						}}
						>
						{
							this.props.showMessage === true
							?
							<Message header={this.props.message} />
							:
							null
						}
							<Segment
							style={{
								boxShadow: '0px 8px 15px -6px black'
							}}
							>
							<Grid.Row
							style={{
								marginBottom:'26px'
							}}
							>
								<h1>Register</h1>
							</Grid.Row>
							<Grid.Row>
								<Form onSubmit={this.handleRegisterSubmit}>
								<Form.Field>
								<div
								style={{
									display:'flex'
								}}
								>
								<Grid.Column style={{marginRight:'20px'}}>
									<Segment>
									<Form.Group>
										<Form.Input 
										label="First Name" 
										type="text" 
										name="first_name"
										value={this.state.first_name}
										onChange={this.handleChange}
										/>

										<Form.Input 
										label="Last Name"
										type="text" 
										name="last_name"
										value={this.state.last_name}
										onChange={this.handleChange}
										/>
									</Form.Group>
										<Form.Input 
										label="Email" 
										type="text" 
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										/>

										<Form.Input 
										label="Password"
										type="password" 
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
										/>
									</Segment>
								</Grid.Column>
								<Grid.Column>
									<Segment
									style={{
										paddingBottom: '0'
									}}
									>
									<Form.Group>
										<Form.Input 
										label="Address 1" 
										type="text" 
										name="address_1"
										value={this.state.address_1}
										onChange={this.handleChange}
										/>

										<Form.Input 
										label="Address 2"
										type="text" 
										name="address_2"
										value={this.state.address_2}
										onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Input 
										label="City" 
										type="text" 
										name="city"
										value={this.state.city}
										onChange={this.handleChange}
										/>

										<Form.Input 
										label="State"
										type="text" 
										name="state"
										value={this.state.state}
										onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Input 
										label="Zip Code" 
										type="text" 
										name="zip_code"
										value={this.state.zip_code}
										onChange={this.handleChange}
										/>

										<Form.Input 
										label="Country"
										type="text" 
										name="country"
										value={this.state.country}
										onChange={this.handleChange}
										/>
									</Form.Group>
									</Segment>
								</Grid.Column>
								</div>
								<Button
								color='blue'
								style={{
									width:'100%',
									marginTop: '10px'
								}}
								>Register</Button>
								</Form.Field>
								</Form>
							</Grid.Row>
								<small> Already have an account? Login <Link to='/' onClick={() => this.props.hideMessage(true)}>here</Link>!</small>
							</Segment>
						</div>
					</Route>
					<Route path='/'>
						<div 
						style={{
							marginTop: '50px'
						}}
						>
						{
							this.props.showMessage === true
							?
							<Message header={this.props.message} />
							:
							null
						}
							<Segment
							style={{
								height: '250px',
								boxShadow: '0px 8px 15px -6px black'
							}}
							>
							<Grid.Row
							style={{
								marginBottom:'26px'
							}}
							>
								<h1>Login</h1>
							</Grid.Row>
							<Grid.Row>
								<Form onSubmit={this.handleLoginSubmit}>
								<Segment>
									<Form.Group>
										<Form.Input 
										label="Email" 
										type="text" 
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										/>
										<Form.Input 
										label="Password"
										type="password" 
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
										/>
									</Form.Group>
									<Button
									color='blue'
									style={{
										width:'100%'
									}}
									>Login</Button>
								</Segment>
								</Form>
							</Grid.Row>
								<small> Don't have an account yet? Register <Link to='/register' onClick={() => this.props.hideMessage(true)}>here</Link></small>
							</Segment>
						</div>
					</Route>
				</Switch>
			</Router>
			</Grid>
		)
	}
}

export default LoginRegister
