import React, { useContext, useEffect, useState } from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext';


function Feed({ username , timeline}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user:currentUser } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("/posts/timeline/" + currentUser._id)
			setPosts(res.data.sort((p1,p2)=>{
				return new Date(p2.createdAt) - new Date(p1.createdAt);
			}));
		}
		fetchPosts();
	}, [username, currentUser._id]);


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
