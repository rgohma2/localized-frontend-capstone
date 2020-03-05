import React from 'react'

import { Form, Label, Button, Modal } from 'semantic-ui-react'

import axios from 'axios'

class ChangeBannerModal extends React.Component {
	constructor() {

		super()

		this.state = {
			image: '',
			formData: null
		}
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
		this.props.changeBanner(this.state.image)
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
			onClose={this.props.toggleChangeBanner}>
			<Modal.Header>Change Banner</Modal.Header>
			<Modal.Content>
				<Form onSubmit={this.handleSubmit}>
					<Form.Input
					type='file'
					label='Banner Photo'
					name='image'
					onChange={this.handleUploadChange}
					/>
					<Button>Update</Button>
				</Form>
			</Modal.Content>
			</Modal>
		)
	}
}

export default ChangeBannerModal