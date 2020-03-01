import React from 'react'
import NewBusinessForm from './NewBusinessForm'
import CategoryList from './CategoryList'
import BusinessProfile from './BusinessProfile'
import NewPostModal from './NewPostModal'
import LocalBusinessesList from './LocalBusinessesList'

import { Segment } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class LocalizedContainer extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			businesses: [],
			newModalOpen: false,
			addedBusiness: false
		}
	}

	componentDidMount() {
		this.getBusinesses()
	}

	getBusinesses = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/businesses/'
		const response = await fetch(url)
		const businessesJson = await response.json()
		console.log(businessesJson);
		this.setState({businesses: businessesJson.data})
	}

	addBusiness = async (businessInfo) => {
		console.log('hi');
		const url = process.env.REACT_APP_API_URL + '/api/v1/businesses/'
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'POST',
	        body: JSON.stringify(businessInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
		})
		const newBusJSON = await response.json()
		console.log(newBusJSON);

		if (newBusJSON.status == 200) {
			this.props.renderNewBusiness(newBusJSON.data)
			this.setState({
				addedBusiness: true
			})
		}
	}

	toggleNewModal = () => {
		this.setState({
			newModalOpen: this.state.newModalOpen === false ? true : false
		})
	}

	addPost = async (postInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.props.business.id
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'POST',
	        body: JSON.stringify(postInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
		})
		const postJSON = await response.json()
		console.log(postJSON);
	}


	render() {
		return(
			<div>
				<Router>
					<nav>
						<Link to='/'><h1 style={{color:'black'}}>Localized</h1></Link>
						<div
						style={{
							alignSelf: 'center',
							display: 'flex',
							justifyContent: 'space-around'
						}}
						>
							<Link to='/newsfeed'>Newsfeed</Link>
							<Link to='/local'>Local Businesses</Link>
							{	
								this.props.businessOwner === false
								?
								<Link to='/new'>Add Your Business</Link>
								:
								<Link to='/profile'>Your Business Profile</Link>
							}
							<Link to='/' onClick={() => this.props.logout(true)}>Logout</Link>
						</div>
					</nav>
					<Segment>
						<Switch>
							<Route path='/local'>
								<h1>Local Businesses</h1>
								<LocalBusinessesList
								businesses={this.state.businesses}
								/>
							</Route>
						</Switch>
						<Switch>
							<Route path='/new'>
								<h1>Add Your Business</h1>
								<NewBusinessForm
								addBusiness={this.addBusiness}
								/>
							</Route>
						</Switch>
						<Switch>
							<Route path='/newsfeed'>
								<h1>Newsfeed</h1>
								<CategoryList/>	
							</Route>
							<Switch>
							<Route path='/profile'>
								<h1>Business Profile</h1>
								<BusinessProfile
								toggleNewModal={this.toggleNewModal}
								business={this.props.business}
								/>
								{
									this.state.newModalOpen === true
									?
									<NewPostModal
									toggleNewModal={this.toggleNewModal}
									addPost={this.addPost}
									/>	
									:
									null
								}
							</Route>
						</Switch>
						</Switch>
					{
						this.state.addedBusiness === true
						?
						<Redirect to='/profile'/>
						:
						null
					}
					</Segment>
				</Router>
			</div>
		)
	}
}

export default LocalizedContainer