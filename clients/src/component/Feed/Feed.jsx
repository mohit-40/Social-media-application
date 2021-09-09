import React from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
import {Posts} from "../../dummy-data"
import axios from "axios"

function Feed() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="feed">
			<div className="feed-wrapper">
				<Share />
				{Posts.map((post)=> <Post key={post.id} post={post}/> )}
			</div>
		</div>
	)
}

export default Feed
