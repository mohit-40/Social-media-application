import React from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'


function Feed() {
	return (
		<div className="feed">
			<div className="feed-wrapper">
				<Share />
				<Post />
			</div>
		</div>
	)
}

export default Feed
