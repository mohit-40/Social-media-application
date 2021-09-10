import React, { useContext, useEffect, useState } from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext';


function Feed({ username }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("/posts/timeline/" + user._id)
			setPosts(res.data);
		}
		fetchPosts();
	}, [username, user._id]);


	return (
		<div className="feed">
			<div className="feed-wrapper">
				<Share />
				{posts.map((post) => <Post key={post._id} post={post} />)}
			</div>
		</div>
	)
}

export default Feed
