import React from 'react'

import { Card, Segment, Image } from 'semantic-ui-react'



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
				{posts.map((post) => {
					return(
						<Segment key={post.id}>
							<Image width={5} 
							src='https://cdn.sallysbakingaddiction.com/wp-content/uploads/2016/04/how-to-make-homemade-glazed-doughnuts-2.jpg'
							size='medium'
							/>
							{post.content}
						</Segment>
				)})}
			</div>
		)
	}
}

export default NewsfeedList