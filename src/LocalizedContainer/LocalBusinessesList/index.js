import React from 'react'

import { Segment } from 'semantic-ui-react'

class LocalBusinessesList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {

		}
	}

	render() {
		return(
			<div>
			{this.props.businesses.map(b => {
				return(
					<Segment key={b.id}>
						{b.name}
					</Segment>
				)})}
			</div>
		)
	}
}

export default LocalBusinessesList