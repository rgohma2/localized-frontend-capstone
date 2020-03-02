import React from 'react'

import { Segment, Button, Form, TextArea, Card, Icon } from 'semantic-ui-react'

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
			<Segment>
				<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end'
				}}
				>
					<Icon onClick={() => this.props.getPostId(-1)}name='close'/>
				</div>
				<h2>{this.props.post.content}</h2>
				{this.props.comments.map(comment => {
					return (
						<Card key={comment.id}>
							{comment.content}
							<br />
							{comment.date}
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