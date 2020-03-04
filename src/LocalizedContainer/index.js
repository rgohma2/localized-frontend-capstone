import React from 'react'
import NewBusinessForm from './NewBusinessForm'
import NewsfeedContainer from './NewsfeedContainer'
import BusinessProfile from './BusinessProfile'
import NewPostModal from './NewPostModal'
import EditPostModal from './EditPostModal'
import LocalBusinessesList from './LocalBusinessesList'
import BusinessShow from './BusinessShow'
import BusinessEditModal from './BusinessEditModal'


import { Segment, Dimmer, Loader } from 'semantic-ui-react'

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
			userBusinessPosts: [],
			subscribed: false,
			newModalOpen: false,
			addedBusiness: false,
			busIdToShow: -1,
			businessToShow: '',
			businessToShowPosts: [],
			buttonState: null,
			idOfPostToEdit: -1,
			editBusiness: false,
			lat: 0,
			lng: 0,
			businessLocations: []
		}
	}

	componentDidMount() {
		this.getLocation()
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

		businessesJson.data.forEach(bus => {
			this.getBusinessLocations(bus)
		})

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

	closeEditModal = () => {
		this.setState({
			idOfPostToEdit: -1
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
		if (postJSON.status === 200) {
			this.getSubscriptions()
			this.toggleNewModal()
		}
	}

	deletePost = async (id) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + id
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'DELETE',
	    })
	    const postJSON = await response.json()
	    console.log(postJSON);
	}

	editPost = (id) => {
		console.log(id);
		this.setState({
			idOfPostToEdit: id
		})
	}

	updatePost = async (postInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.state.idOfPostToEdit
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'PUT',
	        body: JSON.stringify(postInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
		})
		const postJSON = await response.json()

		if (postJSON.status === 201) {
			const posts = this.state.userBusinessPosts
			const index = posts.findIndex(post => post.id === this.state.idOfPostToEdit)
			posts[index] = postJSON.data 
			this.setState({
				userBusinessPosts: posts
			})
			this.closeEditModal()
		}
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
		this.checkIfSubscribed()
		if (busJSON.status === 200 && this.state.busIdToShow !== -1){
			this.getBusinessPosts() 
			this.setState({
				businessToShow: busJSON.data
			})
		}
	}

	deleteBusiness = async (id) => {
		console.log(id);
		const url = process.env.REACT_APP_API_URL + '/api/v1/businesses/' + id
		const response = await fetch(url, {
			credentials: 'include',
			method: 'DELETE'
		})
		const busJSON = await response.json()
		console.log(busJSON);
		if (busJSON.status === 200) {
			this.props.notBusinessOwner()
		}
	}

	toggleEditBusiness = () => {
		this.setState({
			editBusiness: this.state.editBusiness === false ? true : false
		})
	}

	updateBusiness = async (businessInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/businesses/' + this.props.business.id
		const response = await fetch(url, {
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(businessInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
	    })
        const busJSON = await response.json()
        console.log(busJSON)
        if (busJSON.status === 200) {
        	const businesses = this.state.businesses
        	const index = businesses.findIndex(bus => bus.id === this.props.business.id)
        	businesses[index] = busJSON.data
        	this.setState({
        		businesses: businesses
        	})
        	this.props.updateUserBusiness(busJSON.data)
        	this.toggleEditBusiness()
        }
	}


	// changes state to true if logged in user is subscribed to the business being viewed 
	checkIfSubscribed = () => {
		let subscribed = false
		this.state.subscriptions.forEach(sub => {
			if (sub.id === this.state.busIdToShow) {
				subscribed = true
			} 
		})
		this.setState({
			subscribed: subscribed
		})
	}

	// gets all the posts for a specific business
	getBusinessPosts = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.state.busIdToShow
		const response = await fetch(url)
		const postsJSON = await response.json()
		if (postsJSON.status === 200){
			this.setState({
				businessToShowPosts: postsJSON.data
			})
		}
	}

	getUserBusinessPosts = async (id) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/' + id
		const response = await fetch(url)
		const postsJSON = await response.json()
		if (postsJSON.status === 200){
			this.setState({
				userBusinessPosts: postsJSON.data
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
			this.setState({
				subscribed: true
			})
			this.getSubscriptions()
		}
	}

	removeSubscription = async (id) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/subscriptions/' + id
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'DELETE'
		})
		const subJSON = await response.json()
		console.log(subJSON)
		if (subJSON.status === 200) {
			this.setState({
			subscribed: false
		})
			this.getSubscriptions()
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

	getLocation = async () => {
		const address = this.props.userAddress
		console.log(address);
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/'${address.address_1} ${address.city} ${address.state} ${address.zip_code}'.json?country=us&limit=10&access_token=pk.eyJ1IjoicmdvaG1hMiIsImEiOiJjazdjZ3N0cnYwMDVxM2Z0NGlsYzZtMzQ2In0.AU_ozSpU4gV6Z8GtDhGjEw`
		const response = await fetch(url)
		const location = await response.json()
		this.setState({
			lng: location.features[0].center[1],
			lat: location.features[0].center[0]
		})
	}

	getBusinessLocations = async (bus) => {
		if (bus.address.address_1 !== "") {
			console.log(bus.address.address_1);
			const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/'${bus.address.address_1} ${bus.address.city} ${bus.address.state} ${bus.address.zip_code}'.json?country=us&limit=10&access_token=pk.eyJ1IjoicmdvaG1hMiIsImEiOiJjazdjZ3N0cnYwMDVxM2Z0NGlsYzZtMzQ2In0.AU_ozSpU4gV6Z8GtDhGjEw`)
			const location = await response.json()
			this.setState({
				businessLocations:[...this.state.businessLocations, {
					lng: location.features[0].center[1],
					lat: location.features[0].center[0]
				}]
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

								{
									this.state.lat === 0
									?
								    null
									:
									<LocalBusinessesList
									businesses={this.state.businesses}
									getBusinessId={this.getBusinessId}
									lat={this.state.lat}
									lng={this.state.lng}
									getBusinessLocations={this.getBusinessLocations}
									/>
								}
								
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
								getBusinessId={this.getBusinessId}
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
									deleteBusiness={this.deleteBusiness}
									getUserBusinessPosts={this.getUserBusinessPosts}
									posts={this.state.userBusinessPosts}
									deletePost={this.deletePost}
									editPost={this.editPost}
									toggleEditBusiness={this.toggleEditBusiness}
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
									{
										this.state.idOfPostToEdit !== -1
										?
										<EditPostModal
										closeEditModal={this.closeEditModal}
										post={this.state.userBusinessPosts.find(post => post.id === this.state.idOfPostToEdit)}
										updatePost={this.updatePost}
										/>	
										:
										null
									}
									{
										this.state.editBusiness === true
										?
										<BusinessEditModal
										toggleEditBusiness={this.toggleEditBusiness}
										updateBusiness={this.updateBusiness}
										business={this.props.business}
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
									subscriptions={this.state.subscriptions}
									subscribed={this.state.subscribed}
									checkIfSubscribed={this.checkIfSubscribed}
									removeSubscription={this.removeSubscription}
									buttonState={this.state.buttonState}
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
					{
						this.props.businessOwner === false
						?
						<Redirect to='/new'/>
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