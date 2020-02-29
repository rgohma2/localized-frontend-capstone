import React from 'react'

import {Form, Label, Button, Modal} from 'semantic-ui-react'

class NewPostModal extends React.Component {
	constructor() {

		super()

		this.state = {
			image: '',
			content: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.toggleNewModal}>
			<Modal.Header>Make New Post</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Input
					type='text'
					label='Post Image'
					name='image'
					value={this.state.image}
					onChange={this.handleChange}
					/>
					<Form.Input
					type='text'
					label='Post Content'
					name='content'
					value={this.state.content}
					onChange={this.handleChange}
					/>
					<Button>Post</Button>
				</Form>
			</Modal.Content>
			</Modal>
		)
	}
}

export default NewPostModal