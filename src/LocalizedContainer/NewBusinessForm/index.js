import React from 'react'

import { Form, Button, Grid, Segment, Message} from 'semantic-ui-react'

class NewBusinessForm extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			business_name: '',
			category: '',
			image: '',
			about: '',
			address_1: '',
			address_2: '',
			city: '', 
			state: '', 
			zip_code: '', 
			country: ''
		}
	}

	render() {
		return(
			<Grid centered>
				<div 
				style={{
					marginTop: '50px'
				}}
				>
				{
					this.props.showMessage === true
					?
					<Message header={this.props.message} />
					:
					null
				}
					<Segment
					style={{
						boxShadow: '0px 8px 15px -6px black'
					}}
					>
					<Grid.Row
					style={{
						marginBottom:'26px'
					}}
					>
						<h1>New Business</h1>
					</Grid.Row>
					<Grid.Row>
						<Form onSubmit={this.handleRegisterSubmit}>
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
								name="business_name"
								value={this.state.business_name}
								onChange={this.handleChange}
								/>
								<Form.Select 
								label="Category"
								type="text" 
								value={this.state.category}
								onChange={this.handleChange}
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
						>Register</Button>
						</Form.Field>
						</Form>
					</Grid.Row>
					</Segment>
				</div>
			</Grid>
		)
	}
}

export default NewBusinessForm