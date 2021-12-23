import React, { useEffect, useState } from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
import { useSelector } from 'react-redux'
import { userRequest } from '../../requestMethod'

function Feed({ username, timeline }) {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const [currentUser, setCurrentUser]= useState(null);
	useEffect(()=>{
		const fetchUser=async()=>{
			try {
				const res = await userRequest.get("/users?userId="+currentUserId); 
				setCurrentUser(res.data);
			} catch(error) {
				console.log(error);
			}
		}
		fetchUser();
	},[currentUserId,setCurrentUser])
	// fetched currentUser
	
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const ac = new AbortController(); // to solve some non compulsory error
		const fetchPosts = async () => {
			const res = username ? await userRequest.get("/posts/profile/" + username) : await userRequest.get("/posts/timeline/" + currentUserId)
			setPosts(res.data.sort((p1, p2) => {
				return new Date(p2.createdAt) - new Date(p1.createdAt);
			}));
		}
		fetchPosts();
		return () => ac.abort(); // Abort both fetches on unmount
	}, [username, currentUserId]);


	return (
		<div className="feed">
			<div className="feed-wrapper">
				{username === currentUser?.username || timeline ? <Share setPosts={setPosts} posts={posts}/> : ''}
				{posts.length!==0 ? posts.map((post) => <Post key={post._id} post={post} posts={posts} setPosts={setPosts} />) : "No Post Currently."}
			</div>
		</div>
	)
}

export default Feed
