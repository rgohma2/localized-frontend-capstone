import React from 'react'

import { Segment, Menu } from 'semantic-ui-react'

class CategoryList extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeItem: 'All'
		}
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render(){
		const { activeItem } = this.state
		return(
			<Menu vertical fluid>

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
		)	
	}
}

export default CategoryList