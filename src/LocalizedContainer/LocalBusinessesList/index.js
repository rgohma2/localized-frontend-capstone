import React from 'react'

import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
						<Link onClick={() => this.props.getBusinessId(b.id)} to={'/show/' + b.id}>{b.name}</Link>
					</Segment>
				)})}
			</div>
		)
	}
}

export default LocalBusinessesList