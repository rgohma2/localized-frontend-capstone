import React from 'react'

import { Card, Segment } from 'semantic-ui-react'



class NewsfeedList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		this.getPosts()
	}

	getPosts = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/'
		const response = await fetch(url, {
			credentials: 'include'
		})
		const postsJSON = await response.json()
		console.log(postsJSON);

		if (postsJSON.status === 201) {
			this.setState({
				posts: postsJSON.data
			})
		}
	}

	render() {
		let posts = this.state.posts
		if (this.props.category !== 'all') {
			posts = posts.filter(post => post.business.category === this.props.category)
		} 
		console.log(posts);
		return(
			<div>
				<ul>
					{posts.map((post) => {
						return(
							<li key={post.id}>
								{post.content}
							</li>
					)})}
				</ul>
			</div>
		)
	}
}

export default NewsfeedList