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

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			// center: [-87.819082, 41.913435],
			center: [this.props.lat, this.props.lng],
			zoom: this.state.zoom
		})

		console.log(this.props.businessLocations);
		console.log('hi'); 

		const popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false
		})

		this.props.businessLocations.forEach(bus => {
			const marker = new mapboxgl.Marker()
			.setLngLat([bus.lat, bus.lng])
			.setPopup(new mapboxgl.Popup({ offset: 25 })
			.setHTML('<h3>' + bus.name + '</h3><p>' + bus.category + ' vendor'+ '</p>'))
			
			const markerDiv = marker.getElement()
			console.log(markerDiv);

			markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
			markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
			markerDiv.addEventListener('click', () => this.props.getBusinessId(bus.id))


			marker.addTo(map)
		})

		const marker = new mapboxgl.Marker().setLngLat([-87.819082, 41.913435]).addTo(map);
		const markerDiv = marker.getElement()
		console.log(markerDiv);
	}



	render() {

		console.log(this.props.businessLocations);
		return(
			<div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<div style={{width:'80vw', height: '50vh'}} ref={el => this.mapContainer = el} />
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