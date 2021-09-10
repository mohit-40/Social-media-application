import React,{useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import "./Post.css"
import { MoreVert } from "@material-ui/icons";
import axios from 'axios';
import {format} from "timeago.js"
import { AuthContext } from '../../Context/AuthContext';

function Post(props) {
	
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currentUser}=useContext(AuthContext);
	const [user, setUser] = useState({});

	const [like,setLike]=useState(props.post.like.length);
	const [isLike,setIsLike]=useState(false);


	useEffect(() => {
		setIsLike( props.post.like.includes(currentUser._id) );
	}, [currentUser,props.post.like]);

	
	const handleLike= async ()=> {
		await axios.put("/posts/"+props.post._id+"/like",{userId : currentUser._id});
		if(isLike){setLike(like-1);}
		else {setLike(like+1);}
		setIsLike(!isLike);
	}

	useEffect(() => {
		const fetchUser= async ()=>{
			const res=await axios.get(`/users?userId=${props.post.userId}`);
			setUser(res.data);
		}
		fetchUser();
	}, [props.post.userId])

	return (
		<div className="post">
			<div className="post-wrapper">

				<div className="post-top">
					<div className="post-top-left">
						<img className="profile-img" src={ user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="img" />
						<Link className='text-link' to={`/profile/${user.username}`}>
							<div className="name">{user.username}</div>
						</Link>
						<div className="time">{format(props.post.createdAt)}</div>
					</div>
					<div className="post-top-right">
						<MoreVert className="more-icon" />
					</div>
				</div>
				<hr />
				<div className="post-middle">
					<div className="post-text">{props.post.desc}</div>
					{props.post.img&&<img src={PF + props.post.img} className="post-img" alt="post-img" />}
				</div>
				<div className="post-bottom">
					<div className="post-bottom-left">
						<img src={PF + "like.png"} alt="" onClick={handleLike} />
						<img src={PF + "heart.png"} alt="" onClick={handleLike} />
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
