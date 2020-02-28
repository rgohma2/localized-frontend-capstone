import React from 'react'



class NewsfeedList extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			posts: ''
		}
	}

	componentDidMount() {
		this.getPosts()
	}

	getPosts = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/posts/'
		const response = await fetch(url, {
			credentials: 'include'
		})
		const postsJSON = await response.json()
		console.log(postsJSON);

		if (postsJSON.status === 201) {
			this.setState({
				posts: postsJSON.data
			})
		}
	}

	render() {
		// console.log(this.props.category);
		return(
			<div>
				
			</div>
		)
	}
}

export default NewsfeedList