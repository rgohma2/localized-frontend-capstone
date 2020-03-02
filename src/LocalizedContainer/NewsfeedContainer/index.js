import React from 'react'

import { Menu, Grid, Segment } from 'semantic-ui-react'
import NewsfeedList from '../NewsfeedList'

class NewsfeedContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeItem: 'all'
		}
	}

	// changes active item in state to be the name of the menu item that was clicked 
	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name })
	}

	render(){
		const { activeItem } = this.state
		return(
			<Grid centered columns={2} divided>
				<Grid.Column>
					<Menu vertical fluid>

						<Menu.Item 
						name='all'
						active={activeItem === 'all'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='agriculture'
						active={activeItem === 'agriculture'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='clothing'
						active={activeItem === 'clothing'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='drink'
						active={activeItem === 'drink'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='food'
						active={activeItem === 'food'}
		              	onClick={this.handleItemClick}
						/>
						<Menu.Item 
						name='technology'
						active={activeItem === 'technology'}
		              	onClick={this.handleItemClick}
						/>
					</Menu>
					<Segment>
						<h3>Subscriptions</h3>
						{this.props.subscriptions.map(sub => {
							return(
								<div key={sub.id}>
									{sub.name}
								</div>
							)
						})}
					</Segment>
				</Grid.Column>
				<Grid.Column>
					<NewsfeedList
					category={this.state.activeItem}
					posts={this.props.posts}
					/>
				</Grid.Column>
				<Grid.Column>
				</Grid.Column>
			</Grid>
		)	
	}
}

export default NewsfeedContainer