import React from 'react'


import { Form, Label, Button, Modal } from 'semantic-ui-react'

import axios from 'axios'


class EditPostModal extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			image: '',
			content: '',
			formData: null
		}
	}

	componentDidMount() {
		this.setState({
			content: this.props.post.content,
			image: this.props.post.image
		})
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		await axios.post('https://api.cloudinary.com/v1_1/localized/upload', this.state.formData)
		.then( res => {
			console.log(res);
			if (res.status === 200) {
				this.setState({
					image: res.data.secure_url,
				})
			}
		})
		this.submit()
	}

	submit = (e) => {
		if (this.state.formData === null) {
			e.preventDefault()
		} 
		this.props.updatePost(this.state)
	}

	handleUploadChange = async (e) => {
		const file = e.target.files[0]
		const fd = new FormData()
		fd.append('upload_preset', 'randyGohmann')
		fd.append('file', file)
		this.setState({
			formData: fd
		})
	}


	render() {
		
		return(
			<Modal 
			open={true} 
			closeIcon={true} 
			onClose={this.props.closeEditModal}>
			<Modal.Header>Edit Post</Modal.Header>
			<Modal.Content>
				<Form onSubmit={this.state.formData === null ? this.submit : this.handleSubmit}>
					<Form.Input
					type='file'
					label='Photo'
					name='image'
					onChange={this.handleUploadChange}
					/>
					<Form.Input
					type='text'
					label='Content'
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

export default EditPostModal