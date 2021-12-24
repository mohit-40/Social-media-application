import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod'; 
import "./PostCommentItem.css"

function PostCommentItem({c , deleteComment}) {
	const currentUserId = useSelector(state=>state.user.currentUserId);
	const [user, setUser] = useState(null)
	useEffect(() => { 
		const fetchUser = async () => {
			const res = await userRequest.get(`/users?userId=${c.userId}`);
			setUser(res.data);
		}
		fetchUser();
	}, [c])

	return (
		<div className="postCommentItem"> 
			<div className="postCommentItemImgContainer">
				<img src={user?.profilePicture} alt="img" className="postCommentItemImg" />
			</div>
			<div className="postCommentItemContent">
				<div className="postContainerItemText">
					<b>{user?.name}</b> {c.text}
				</div>
				{currentUserId === c.userId && <button onClick={()=>deleteComment(c._id)}  className="postCommentItemButton">delete</button>}
			</div>
		</div>
	)
}

export default PostCommentItem
