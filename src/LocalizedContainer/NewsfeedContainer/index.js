import React from 'react'

import { Menu, Grid, Segment } from 'semantic-ui-react'
import NewsfeedList from '../NewsfeedList'
import CommentsContainer from '../CommentsContainer'
import { Link } from 'react-router-dom'

class NewsfeedContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeItem: 'all',
			postId: -1,
			comments: []
		}
	}

	// changes active item in state to be the name of the menu item that was clicked 
	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name })
	}

	addComment = async (commentInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.state.postId
		const response = await fetch(url, {
			credentials: 'include',
	        method: 'POST',
	        body: JSON.stringify(commentInfo),
	        headers: {
	          'Content-Type': 'application/json'
	        }
		})
		const commentJSON = await response.json()
		if (commentJSON.status === 200){
			this.getComments()
		}
	}

	getComments = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.state.postId
		const response = await fetch(url, {
			credentials: 'include'
		})
		const commentJSON = await response.json()
		if (commentJSON.status === 200){
			this.setState({
				comments: commentJSON.data
			})
		}
	}

	getPostId = (id) => {
		this.setState({
			postId: id
		})	
	}

	render(){
		const { activeItem } = this.state
		return(
			<Grid centered columns={3} divided>
				<Grid.Column>
					<Menu vertical fluid>

						<Menu.Item 
						name='all'
						active={activeItem === 'all'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='agriculture'
						active={activeItem === 'agriculture'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='clothing'
						active={activeItem === 'clothing'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='drink'
						active={activeItem === 'drink'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='food'
						active={activeItem === 'food'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='technology'
						active={activeItem === 'technology'}
		              	onClick={this.handleItemClick}
						/>
					</Menu>
					<Segment>
						<h3>Subscriptions</h3>
						{this.props.subscriptions.map(sub => {
							return(
								<div key={sub.id}>
									<Link onClick={() => this.props.getBusinessId(sub.id)} to={'/show/' + sub.id}>{sub.name}</Link>
								</div>
							)
						})}
					</Segment>
				</Grid.Column>
				<Grid.Column>
					<NewsfeedList
					category={this.state.activeItem}
					posts={this.props.posts}
					getPostId={this.getPostId}
					/>
				</Grid.Column>
				{
					this.state.postId !== -1
					?
					<Grid.Column>
						<CommentsContainer
						addComment={this.addComment}
						getComments={this.getComments}
						comments={this.state.comments}
						/>
					</Grid.Column>
					:
					null

				}
			</Grid>
		)	
	}
}

export default NewsfeedContainer