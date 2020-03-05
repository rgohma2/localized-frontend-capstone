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
			post: '',
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
		const comments = this.state.comments 
		comments.push(commentJSON.data)
		this.setState({
			comments: comments
		})
	}

	getComments = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.state.postId
		const response = await fetch(url, {
			credentials: 'include'
		})
		const commentJSON = await response.json()
		if (commentJSON.status === 200){
			this.setState({
				comments: commentJSON.data,
			})
		}
	}
	getPost = (post) => {
		this.setState({
			post: post
		})
	}

	getPostId = (id) => {
		this.setState({
			postId: id
		})	
	}

	render(){
		const { activeItem } = this.state
		return(
			<Grid centered columns={this.state.postId === -1 ? 2 : 3} >
				<Grid.Column width={4}>
					<Menu vertical>

						<Menu.Item 
						name='all'
						active={activeItem === 'all'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='agricultural'
						active={activeItem === 'agriculture'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='art'
						active={activeItem === 'art'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='apparel'
						active={activeItem === 'apparel'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='food'
						active={activeItem === 'foodstuffs'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='technology'
						active={activeItem === 'technology'}
		              	onClick={this.handleItemClick}
						/>
					</Menu>
				
				</Grid.Column>
				<Grid.Column width={8}>
					<NewsfeedList
					category={this.state.activeItem}
					posts={this.props.posts}
					getPostId={this.getPostId}
					getPost={this.getPost}
					getBusinessId={this.props.getBusinessId}
					/>
				</Grid.Column>
				<Grid.Column width={4}>
				<Segment style={{width: '210px'}}>
						<h3>Subscriptions</h3>
						{this.props.subscriptions.map(sub => {
							return(
								<div key={sub.id}>
									<Link onClick={() => this.props.getBusinessId(sub.id)} to={'/show/' + sub.id}>{sub.name}</Link>
								</div>
							)
						})}
				</Segment>
				{
					this.state.postId !== -1
					?
						<CommentsContainer
						addComment={this.addComment}
						getComments={this.getComments}
						comments={this.state.comments}
						getPostId={this.getPostId}
						post={this.state.post}
						/>
					:
					null

				}
				</Grid.Column>
			</Grid>
		)	
	}
}

export default NewsfeedContainer