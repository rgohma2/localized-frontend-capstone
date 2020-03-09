import React from 'react'

import { Grid, Segment, Card, Button, Image, Icon } from 'semantic-ui-react'

class BusinessShow extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			
		}
	}

	componentDidMount() {
		this.props.getBusiness()
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
					backgroundImage: `url(${this.props.businessToShow.image})`,
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
							fontSize: '4em'
						}}
						>{this.props.businessToShow.name}</h1>
					</Card>
					<Button	
					onClick={
							this.props.subscribed === false
							?
							() => {
								this.props.addSubscription(this.props.businessToShow.id)
							}
							:
							() => {
								this.props.removeSubscription(this.props.businessToShow.id)
							}
					}
					style={{marginBottom:'45px'}} 
					size='large' 
					color= 
					{
						this.props.subscribed === false
						?
						'red'
						:
						null
					}>

					{
						this.props.subscribed === true
						?
						<Button.Content>
							Subscribed	
							<Icon name='check circle'/>
						</Button.Content> 
						:
						<Button.Content>
							Subscribe
						</Button.Content> 
					}
					</Button>
				</Segment>
				<h1>About</h1>
				<div>{this.props.businessToShow.about}</div>
				<Segment>	
					<Card.Group itemsPerRow={2}>
					{this.props.posts.reverse().map(post => {
						return(
							<Card key={post.id}>
								<Image src={post.image}/>
								<Card.Content>
								<Card.Header>
									<h1>
										{post.business.name}
									</h1>
								</Card.Header>
								{post.content}
								<br />
								{post.date}
								</Card.Content>
							</Card>
					)})}
					</Card.Group>
				</Segment>
			</div>
		)
	}
}



export default BusinessShow