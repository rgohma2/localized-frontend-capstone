import React from 'react'

import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoicmdvaG1hMiIsImEiOiJjazdjZ3N0cnYwMDVxM2Z0NGlsYzZtMzQ2In0.AU_ozSpU4gV6Z8GtDhGjEw'




class LocalBusinessesList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			zoom: 10
		}
	}

	componentDidMount() {
		console.log(this.props.lat);
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			// center: [-87.819082, 41.913435],
			center: [this.props.lat, this.props.lng],
			zoom: this.state.zoom
		})
	}






	render() {
		console.log(this.props.businesses);
			// getBusinessLocations = async () => {
				
			// 	this.state.businesses.forEach(bus => {
			// 		console.log(bus);
			// 		// if (bus.address.address_1 !== '') {
			// 		// 	const response = `https://api.mapbox.com/geocoding/v5/mapbox.places/'${bus.address.address_1} ${address.city} ${address.state} ${address.zip_code}'.json?country=us&limit=10&access_token=pk.eyJ1IjoicmdvaG1hMiIsImEiOiJjazdjZ3N0cnYwMDVxM2Z0NGlsYzZtMzQ2In0.AU_ozSpU4gV6Z8GtDhGjEw`
			// 		// }
			// 	})
			// }
		return(
			<div>
				<div>
					<div style={{width:'50vw', height: '50vh'}} ref={el => this.mapContainer = el} />
				</div>
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