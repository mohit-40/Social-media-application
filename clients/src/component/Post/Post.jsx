import React,{useState} from 'react'
import "./Post.css"
import { MoreVert } from "@material-ui/icons";
import {Users} from "../../dummy-data"

function Post(props) {

	const user=Users.find((user)=> user.id===props.post.userId);
	const [like,setLike]=useState(props.post.like);
	const [isLike,setIsLike]=useState(false);
	const handleLike= ()=> {
		if(isLike) {setLike(like-1);} 
		else {setLike(like+1);}
		setIsLike(!isLike);
		
	}


	return (
		<div className="post">
			<div className="post-wrapper">

				<div className="post-top">
					<div className="post-top-left">
						<img className="profile-img" src={user.profilePicture} alt="img" />
						<div className="name">{user.username}</div>
						<div className="time">{props.post.date}</div>
					</div>
					<div className="post-top-right">
						<MoreVert className="more-icon" />
					</div>
				</div>
				<hr />
				<div className="post-middle">
					<div className="post-text">{props.post.desc}</div>
					{props.post.photo&&<img src={props.post.photo} className="post-img" alt="post-img" />}
				</div>
				<div className="post-bottom">
					<div className="post-bottom-left">
						<img src="/asset/like.png" alt="" onClick={handleLike} />
						<img src="/asset/heart.png" alt="" onClick={handleLike} />
						<span className="like-counter">{like} people like it</span>
					</div>
					<div className="post-bottom-right">
						<span className="comment-counter">{props.post.comment} comment</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
