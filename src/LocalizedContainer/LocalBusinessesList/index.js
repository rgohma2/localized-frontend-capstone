import React from 'react'

import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoicmdvaG1hMiIsImEiOiJjazdjZ3N0cnYwMDVxM2Z0NGlsYzZtMzQ2In0.AU_ozSpU4gV6Z8GtDhGjEw'




class LocalBusinessesList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			zoom: 10,
			map: '',
			viewport: {
				width: "50vw",
			    height: "50vh",
			    latitude: -87.819082,
			    longitude: 41.913435,
			    zoom: 16
			}
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
		console.log(this.props.businessLocations);
		const marker = new mapboxgl.Marker().setLngLat([-87.819082, 41.913435]).addTo(map);
	}


	render() {

		console.log(this.props.businessLocations);
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