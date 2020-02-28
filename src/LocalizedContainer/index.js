import React from 'react'
import NewsfeedList from './NewsfeedList'

import { Segment } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'

class LocalizedContainer extends React.Component {
	constructor() {

		super()

		this.state = {

		}
	}

	render() {
		return(
			<div>
				<Router>
					<nav>
						<Link to='/'><h1>Localized</h1></Link>
						<div
						style={{
							alignSelf: 'center',
							display: 'flex',
							justifyContent: 'space-around'
						}}
						>
							<Link to='/newsfeed'>Newsfeed</Link>
							<Link to='/local'>Local Businesses</Link> 
							<Link to='/new'>Add Your Business</Link>
							<Link to='/'>Logout</Link>
						</div>
					</nav>
					<Segment>
						<Switch>
							<Route path='/local'>
								<h1>Local Businesses</h1>
							</Route>
						</Switch>
						<Switch>
							<Route path='/new'>
								<h1>Add Your Business</h1>
							</Route>
						</Switch>
						<Switch>
							<Route path='/newsfeed'>
								<h1>Newsfeed</h1>
								<NewsfeedList/>
							</Route>
						</Switch>
					</Segment>
				</Router>
			</div>
		)
	}
}

export default LocalizedContainer