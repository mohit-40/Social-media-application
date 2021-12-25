import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./Post.css"
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js"
import {useSelector} from "react-redux"
import { userRequest } from '../../requestMethod';
import PostCommentItem from "../postCommentItem/PostCommentItem";
import LikeModal from '../LikeModal/LikeModal';

function Post({post , posts ,setPosts}) {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const socket= useSelector(state => state.socket.socket)
	// fetched currentUser
	
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});

	const [like, setLike] = useState(post.like);
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
			if (isLike) { setLike(prev=> prev.filter(l=> l !==currentUserId)); }
			else { setLike(prev => [currentUserId ,...prev]); }
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

	const [postComment , setPostComment] = useState([]);
	useEffect(()=>{
		const fetchComment= async()=>{
			try {
				const res= await userRequest.get("/comment/"+post._id);
				setPostComment(res.data);
			} catch(error) {
				console.log(error);
			}
		}
		fetchComment();
	},[post._id])
	const [comment, setComment] = useState("")
	const [displayComment , setDisplayComment] = useState(false);
	const handleSendComment= async(e)=>{
		e.preventDefault()
		try {
			const c={
				postId : post._id,
				userId:currentUserId,
				text: comment
			}
			const res = await userRequest.post("/comment/"+post._id , c)
			setPostComment(prev=>[...prev , res.data])
			setComment("");
			socket?.emit("sendNotification",{
				receiverId: post.userId,
				senderId: currentUserId,
				text: "comment on your post",
				type: "comment"
			})
		} catch(error) {
			console.log(error)
		}
	}
	const deleteComment=async(cid)=>{
		try { 
			await userRequest.delete(`/comment/${cid}/${currentUserId}`)
			setPostComment(postComment.filter(c=> c._id!=cid))
		} catch(error) {
			console.log(error)
		}
	}

	const [modalShow, setModalShow] = useState(false);


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
						{post.userId === currentUserId ? <i className="fas fa-trash" onClick={handleDelete} style={{fontSize:"25px"}}></i>  : ''}
					
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
						{isLike? <i className="fas fa-heart" onClick={handleLike} style={{color:"red" , fontSize:"25px"}}></i> :<i className="far fa-heart" onClick={handleLike} style={{color:"red" , fontSize:"25px"}} ></i> }
						<span className="like-counter" onClick={() => setModalShow(true)} ><b>{like.length} people like it</b></span>
						<LikeModal show={modalShow} onHide={() => setModalShow(false)} likes={like} />
					</div>
					<div className="post-bottom-right">
						<span className="comment-counter" onClick={()=>setDisplayComment(!displayComment)}><i className="fas fa-comments"></i> <b> {postComment.length} comment </b></span>
					</div>
				</div>
				<div className="postComment">
					{displayComment && postComment.map((c)=>
						<PostCommentItem c={c} deleteComment={deleteComment} />
					)}
					<form className='postCommentForm'>
						<input type="text" value={comment} onChange={e=>setComment(e.target.value)} className="postCommentInput" placeholder='write your comment here'/>
						<button className='postCommentButton' type="submit" onClick={(e)=>handleSendComment(e)}><i className="fas fa-paper-plane" style={{fontSize:"16px"}}>Send</i></button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Post
