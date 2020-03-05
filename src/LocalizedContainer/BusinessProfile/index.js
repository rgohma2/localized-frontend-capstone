import React from 'react'

import { Grid, Segment, Card, Button, Image, Icon, Dropdown, Menu } from 'semantic-ui-react'

class BusinessProfile extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			
		}
	}

	componentDidMount() {
		this.props.getUserBusinessPosts(this.props.business.id)
	}

	componentDidUpdate(prev) {
		if (this.props.posts !== prev.posts) {
			this.props.getUserBusinessPosts(this.props.business.id)
		} 
	}

	render() {
		return(
			<div>
			<Menu vertical>
			    <Dropdown item text='Settings'>
				    <Dropdown.Menu>
					    <Dropdown.Item onClick={this.props.toggleChangeBanner}>Change Banner</Dropdown.Item>
					    <Dropdown.Item onClick={this.props.toggleEditBusiness}>Edit Business</Dropdown.Item>
					    <Dropdown.Item onClick={() => this.props.deleteBusiness(this.props.business.id)}>Delete Business</Dropdown.Item>
				    </Dropdown.Menu>
			    </Dropdown>
	  		</Menu>
				<Segment
				style={{
					display:'flex',
					alignItems: 'flex-end',
					justifyContent: 'space-around',
					height: '300px',
					backgroundImage: `url(${this.props.banner})`,
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
				<div style={{
					display: 'flex'
				}}>
					<div>
						<h1>About</h1>
						{this.props.business.about}
					</div>
				</div>
				<Segment>
					<Card.Group itemsPerRow={2}>
					{this.props.posts.reverse().map(post => {
						return(
							<Card key={post.id}>
								<Image 
								src={post.image}
								/>
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
								<Button.Group>
									<Button onClick={() => this.props.editPost(post.id)}>Edit</Button>
									<Button onClick={() => this.props.deletePost(post.id)}>Delete</Button>
								</Button.Group>
							</Card>
					)})}
					</Card.Group>
				</Segment>
			</div>
		)
	}
}




export default BusinessProfile