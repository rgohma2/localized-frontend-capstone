import React from 'react'

import { Card, Segment, Image } from 'semantic-ui-react'



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
							</Card>
					)})
					:
					"Subscribe to businesses to stay up to date on their posts!"
				}
			</Segment>
		)
	}
}

export default NewsfeedList