import React from 'react'

import { Card, Segment, Image } from 'semantic-ui-react'



class NewsfeedList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			// posts: []
		}
	}

	// componentDidMount() {
	// 	this.getPosts()
	// }


	// temporary place to view all posts
	// will be replaced with only posts from businesses user is subscribed to
	// getPosts = async () => {
	// 	const url = process.env.REACT_APP_API_URL + '/api/v1/posts/'
	// 	const response = await fetch(url, {
	// 		credentials: 'include'
	// 	})
	// 	const postsJSON = await response.json()
	// 	console.log(postsJSON);

	// 	if (postsJSON.status === 201) {
	// 		this.setState({
	// 			posts: postsJSON.data
	// 		})
	// 	}
	// }

	render() {
		let posts = this.props.posts
		if (this.props.category !== 'all') {
			posts = posts.filter(post => post.business.category === this.props.category)
		} 
		console.log(posts);
		return(
			<Segment>
				{posts.map((post) => {
					return(
						<Card key={post.id}>
							{post.business.name}
							<Image src={post.image}/>
							{post.content}
							<br />
							{post.date}
						</Card>
				)})}
			</Segment>
		)
	}
}

export default NewsfeedList