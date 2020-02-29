import React from 'react'

import { Grid, Segment, Card, Button } from 'semantic-ui-react'

class BusinessProfile extends React.Component {
	constructor(props) {

		super(props)

		this.state = {

		}
	}

	render() {
		return(
			<div>
				<Segment
				style={{
					display:'flex',
					alignItems: 'flex-end',
					justifyContent: 'space-around',
					height: '300px',
					backgroundImage: `url(data:image/jpeg;base64,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)`,
					backgroundSize: 'cover'

				}}
				>
					<Card
					style={{
						width: '500px',
						height: '100px',	
						textAlign:'center'
					}}
					>
						<h1
						style={{
							display:'flex',
							alignSelf:'center',
							marginTop: '5px',
							fontSize: '5em'
						}}
						>{this.props.business.name}</h1>
					</Card>
					<Button onClick={this.props.toggleNewModal} style={{marginBottom:'45px'}} size='large'>Make New Post</Button>
				</Segment>
			</div>
		)
	}
}




export default BusinessProfile