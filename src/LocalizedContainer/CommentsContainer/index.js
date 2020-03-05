import React from 'react'

import { Segment, Button, Form, TextArea, Card, Icon, Image } from 'semantic-ui-react'

class CommentsContainer extends React.Component {
	constructor() {

		super()

		this.state = {
			content: ''
		}
	}

	componentDidMount() {
		this.props.getComments()
	}

	componentDidUpdate(prev) {
		if (this.props.comments !== prev.comments) {
			this.props.getComments()
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.addComment(this.state)
		this.setState({
			content: ''
		})
	}

	render() {
		return(
			<Segment style={{overflow: 'scroll', height: '700px'}}>
				<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end'
				}}
				>
					<Icon style={{cursor: 'pointer'}} onClick={() => this.props.getPostId(-1)}name='close'/>
				</div>
				<Image src={this.props.post.image}></Image>
				<h2>{this.props.post.content}</h2>
				{this.props.comments.map(comment => {
					return (
						<Card style={{padding: '5px'}} key={comment.id}>
							<strong>{comment.commenter.first_name}</strong>
							{comment.content}
							<br />
							<small>{comment.date}</small>
						</Card>
				)})}
				<Form onSubmit={this.handleSubmit}>
					<TextArea 
					placeholder='leave a comment'
					name='content'
					value={this.state.content}
					onChange={this.handleChange}
					/>
					<Button>Submit</Button>
				</Form>
			</Segment>
		)
	}
}

export default CommentsContainer