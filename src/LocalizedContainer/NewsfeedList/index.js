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
			<div>
			<Card.Group style={{height: '900px', overflow:'scroll'}} itemsPerRow={1}>
				{
					posts.length > 0
					?
					posts.map((post) => {
						return(
							<Card key={post.id} >
								<Image src={post.image}/>
								<Card.Content>
								<Card.Header>
									<h1 className='fake-link' onClick={() => this.props.getBusinessId(post.business.id)}>
										{post.business.name}
									</h1>
								</Card.Header>
								{post.content}
								<br />
								{post.date}
								</Card.Content>
								<div style={{textAlign: 'center'}}className='fake-link' onClick={() => {
									this.props.getPostId(post.id)
									this.props.getPost(post)
								}}>View Comments</div>
							</Card>
					)})
					:
					<h1>"Subscribe to businesses to view their latest posts here!"</h1>
				}
				</Card.Group>
			</div>

		)
	}
}

export default NewsfeedList