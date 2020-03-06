import React from 'react'

import { Form, Button, Grid, Segment, Modal} from 'semantic-ui-react'

class BusinessEditModal extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			name: '',
			category: '',
			image: '',
			about: '',
			address_1: '',
			address_2: '',
			city: '', 
			state: '', 
			zip_code: '', 
			country: '',
			options: this.getOptions()
		}
	}

	componentDidMount() {
		this.setState({
			name: this.props.business.name,
			category: this.props.business.category,
			image: this.props.business.image,
			about: this.props.business.about,
			address_1: this.props.business.address.address_1,
			address_2: this.props.business.address.address_2,
			city: this.props.business.address.city, 
			state: this.props.business.address.state, 
			zip_code: this.props.business.address.zip_code, 
			country: this.props.business.address.country
		})
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.updateBusiness(this.state)
	}

	getOptions = () => {
		return (
		[
			{key: 1, text: 'Agricultural', value: 'agricultural'},
			{key: 2, text: 'Art', value: 'art'},
			{key: 3, text: 'Apparel', value: 'apparel'},
			{key: 4, text: 'Foodstuffs', value: 'foodstuffs'},
			{key: 5, text: 'Technology', value: 'technology'}
		]
	)}

	render() {
		return(
			<Modal
			open={true} 
			closeIcon={true} 
			onClose={this.props.toggleEditBusiness}>
			>
				<Grid centered style={{marginBottom:'20px'}}>
					<Grid.Row
					style={{
						marginBottom:'10px'
					}}
					>
						<h1>Edit Business</h1>
					</Grid.Row>
					<Grid.Row>
						<Form onSubmit={this.handleSubmit}>
						<Form.Field>
						<div
						style={{
							display:'flex'
						}}
						>
						<Grid.Column style={{marginRight:'20px'}}>
							<Segment>
								<Form.Input 
								label="Business Name" 
								type="text" 
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
								/>
								<Form.Select
								defaultValue={this.state.category}
								fluid
								label="Category"
								name='category'
								options={this.state.options}
								onChange={(e, { value }) => this.setState({
									category: value
								})}	 
								/>
								<Form.Input 
								label="About" 
								type="text" 
								name="about"
								value={this.state.about}
								onChange={this.handleChange}
								/>
							</Segment>
						</Grid.Column>
						<Grid.Column>
							<Segment
							style={{
								paddingBottom: '0'
							}}
							>
							<Form.Group>
								<Form.Input 
								label="Address 1" 
								type="text" 
								name="address_1"
								value={this.state.address_1}
								onChange={this.handleChange}
								/>
								<Form.Input 
								label="Address 2"
								type="text" 
								name="address_2"
								value={this.state.address_2}
								onChange={this.handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Input 
								label="City" 
								type="text" 
								name="city"
								value={this.state.city}
								onChange={this.handleChange}
								/>

								<Form.Input 
								label="State"
								type="text" 
								name="state"
								value={this.state.state}
								onChange={this.handleChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Input 
								label="Zip Code" 
								type="text" 
								name="zip_code"
								value={this.state.zip_code}
								onChange={this.handleChange}
								/>

								<Form.Input 
								label="Country"
								type="text" 
								name="country"
								value={this.state.country}
								onChange={this.handleChange}
								/>
							</Form.Group>
							</Segment>
						</Grid.Column>
						</div>
						<Button
						color='blue'
						style={{
							width:'100%',
							marginTop: '10px'
						}}
						>Update Business</Button>
						</Form.Field>
						</Form>
					</Grid.Row>
				</Grid>
			</Modal>
		)
	}
}

export default BusinessEditModal