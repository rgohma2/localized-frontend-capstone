import React from 'react'
import NewBusinessForm from './NewBusinessForm'
import NewsfeedContainer from './NewsfeedContainer'
import BusinessProfile from './BusinessProfile'
import NewPostModal from './NewPostModal'
import LocalBusinessesList from './LocalBusinessesList'
import BusinessShow from './BusinessShow'

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
			subscriptions: [],
			posts: [],
			newModalOpen: false,
			addedBusiness: false,
			busIdToShow: -1,
			businessToShow: '',
			businessToShowPosts: []
		}
	}

	componentDidMount() {
		this.getBusinesses()
		this.getSubscriptions()
	}


	// retrieves all businesses 
	getBusinesses = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/businesses/'
		const response = await fetch(url)
		const businessesJson = await response.json()
		console.log(businessesJson);
		this.setState({businesses: businessesJson.data})
	}

	// creates a business
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

		if (newBusJSON.status === 200) {
			this.props.renderNewBusiness(newBusJSON.data)
			this.setState({
				addedBusiness: true
			})
		}
	}

	// opens and closes modal that allows a business to make a post
	toggleNewModal = () => {
		this.setState({
			newModalOpen: this.state.newModalOpen === false ? true : false
		})
	}

	// creates a post by a particular business 
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

	// stores id of business clicked on in state to be used to fetch data about business 
	getBusinessId = (id) => {
		this.setState({
			busIdToShow: id
		})
	}

	// gets the data of a specific business
	getBusiness = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/businesses/' + this.state.busIdToShow
		const response = await fetch(url)
		const busJSON = await response.json()
		console.log(busJSON);
		if (busJSON.status === 200 && this.state.busIdToShow !== -1){
			this.getBusinessPosts()
			this.setState({
				businessToShow: busJSON.data
			})
		}
	}

	// gets all the posts for a specific business
	getBusinessPosts = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.state.busIdToShow
		const response = await fetch(url)
		const postsJSON = await response.json()
		console.log(postsJSON);
		if (postsJSON.status === 200){
			this.setState({
				businessToShowPosts: postsJSON.data
			})
		}
	}

	// subscribes the logged in user to the business they choose 
	addSubscription = async (id) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/subscriptions/' + id
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'POST'
		})
		const subJSON = await response.json()
		console.log(subJSON)
		if (subJSON.status === 200) {

		}
	}

	// gets list of all subscriptions for logged in user
	getSubscriptions = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/subscriptions/'
		const response = await fetch(url, {
			credentials: 'include'
		})
		const subJSON = await response.json()
		console.log(subJSON);
		if (subJSON.status === 200){
			this.setState({
				subscriptions: subJSON.subscriptions,
				posts: subJSON.data
			})
		}
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
								getBusinessId={this.getBusinessId}
								/>
							</Route>
						</Switch>
						<Switch>
							<Route path='/new'>
								<h1>Add Your Business</h1>
								<NewBusinessForm
								addBusiness={this.addBusiness}
								/>
							</Route>NewsfeedContainer
						</Switch>
						<Switch>
							<Route path='/newsfeed'>
								<h1>Newsfeed</h1>
								<NewsfeedContainer
								subscriptions={this.state.subscriptions}
								posts={this.state.posts}
								/>	
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
						<Switch>
								<Route path='/show/:id'>
									<BusinessShow 
									getBusiness={this.getBusiness}
									businessToShow={this.state.businessToShow}
									posts={this.state.businessToShowPosts}
									addSubscription={this.addSubscription}
									/>
								</Route>
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