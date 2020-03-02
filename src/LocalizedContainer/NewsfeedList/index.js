import React from 'react'

import { Card, Segment, Image } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

class NewsfeedList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			
		}
	}



	render() {
		let posts = this.props.posts
		if (this.props.category !== 'all') {
			posts = posts.filter(post => post.business.category === this.props.category)
		} 
		return(
			<Segment>
				{
					posts.length > 0
					?
					posts.map((post) => {
						return(
							<Card key={post.id}>
								{post.business.name}
								<Image src={post.image}/>
								{post.content}
								<br />
								{post.date}
								<Link to='/newsfeed'><div as='a' onClick={() => {
									this.props.getPostId(post.id)
									this.props.getPost(post)
								}}>View Comments</div></Link>
							</Card>
					)})
					:
					"Subscribe to businesses to view their latest posts here!"
				}
			</Segment>
		)
	}
}

export default NewsfeedList