import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js"
import {useSelector} from "react-redux"
import { userRequest } from '../../requestMethod';

function Post({post , posts ,setPosts}) {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const socket= useSelector(state => state.socket.socket)
	// fetched currentUser
	
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});

	const [like, setLike] = useState(post.like?.length);
	const [isLike, setIsLike] = useState(false);


	useEffect(() => {
		setIsLike(post.like?.includes(currentUserId));
	}, [currentUserId, post.like]);
	
	
	const handleLike = async () => {
		try {
			await userRequest.put("/posts/" + post._id + "/like", { userId: currentUserId });
			socket?.emit("sendNotification",{
				receiverId: post.userId,
				senderId: currentUserId,
				text: isLike?"unlike your Post":"like your post",
				type:isLike?"unlike":"like"
			})
			if (isLike) { setLike(like - 1); }
			else { setLike(like + 1); }
			setIsLike(!isLike);
		} catch(error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		const fetchUser = async () => {
			const res = await userRequest.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		}
		fetchUser();
	}, [post.userId])

	const [isDeleted, setIsDeleted] = useState(false);
	const handleDelete = async () => {
		try {
			await userRequest.delete("/posts/" + post._id+"/"+currentUserId);
			setIsDeleted(true);
			setPosts(posts.filter(p=> p._id!== post._id)) 
		} catch (error) { 
			console.log(error.message);
		}
	}

	return (
		<div className="post">
			<div className="post-wrapper">

				<div className="post-top">
					<div className="post-top-left">
						<img className="profile-img" src={user.profilePicture ?  user.profilePicture : PF + "person/noAvatar.png"} alt="img" />
						<Link className='text-link' to={`/profile/${user.username}`}>
							<div className="name">{user.name}</div>
						</Link>
						<div className="time">{format(post.createdAt)}</div>
					</div>
					<div className="post-top-right">
						<MoreVert className="more-icon" />
						{post.userId === currentUserId ? <button className="delete-post-btn" onClick={handleDelete}>Delete</button> : ''}
					
						{isDeleted ? <div className="deleted">Post Deleted</div> : ''}
					</div>
				</div>
				<hr />
				<div className="post-middle">
					<div className="post-text">{post.desc}</div>
					{post.img && <img src={post.img} className="post-img" alt="post-img" />}
				</div>
				<div className="post-bottom">
					<div className="post-bottom-left">
						<img src={PF + "like.png"} alt="" onClick={handleLike} />
						<img src={PF + "heart.png"} alt="" onClick={handleLike} />
						<span className="like-counter">{like} people like it</span>
					</div>
					<div className="post-bottom-right">
						<span className="comment-counter">{post.comment} comment</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
