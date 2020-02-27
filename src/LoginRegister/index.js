import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'

import './index.css'
import { Form, Label, Button, Grid, Segment } from 'semantic-ui-react'

class LoginRegister extends React.Component {
	constructor(props) {

		super(props)

		this.state = {

		}
	}

	render() {
		return(
			<Grid
			className="center aligned"
			style={{
				backgroundImage: `url(https://www.reachabovemedia.com/wp-content/uploads/2019/03/optimisation-google-my-business.jpg})`,
				height: '600px'
			}}
			>
			<Router>
				<Switch>
					<Route path='/register'>
						<div className='form'>
							<Segment
							style={{
								height: '200px',
								boxShadow: '5px 5px 5px 2px black'
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
								<Form>
									<Form.Group>
										<Form.Input 
										label="Email" 
										type="text" 
										name="email"/>

										<Form.Input 
										label="Password"
										type="password" 
										name="password"
										/>
									</Form.Group>
								</Form>
							</Grid.Row>
								<small> Already have an account? Login <Link to='/'>here</Link>!</small>
							</Segment>
						</div>
					</Route>
					<Route path='/'>
						<div className='form'>
							<Segment
							style={{
								height: '200px',
								boxShadow: '5px 5px 5px 2px black'
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
								<Form>
									<Form.Group>
										<Form.Input 
										label="Email" 
										type="text" 
										name="email"/>

										<Form.Input 
										label="Password"
										type="password" 
										name="password"
										/>
									</Form.Group>
								</Form>
							</Grid.Row>
								<small> Don't have an account yet? Register <Link to='/register'>here</Link></small>
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
