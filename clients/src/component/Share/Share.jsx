import React, { useEffect, useRef, useState } from 'react'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import "./Share.css"
import { storage } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import { userRequest } from '../../requestMethod';


function Share({ posts, setPosts }) {
	let PF = process.env.REACT_APP_PUBLIC_FOLDER;
	if(process.env.NODE_ENV=="production"){
		PF=process.env.REACT_APP_PUBLIC_FOLDER_DEPLOY
	}
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + currentUserId);
				setCurrentUser(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();
	}, [currentUserId, setCurrentUser])
	//fetched currentUser


	const history = useHistory();
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState()
	const [progress, setProgress] = useState(0)

	const [preview, setPreview] = useState(null)
	const [makePost, setMakePost] = useState(false)


	const handleFilechange = (e) => {
		if (e.target.files[0]) {
			setFile(e.target.files[0])
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
		else {
			setFile(null)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			"userId": currentUserId,
			"desc": desc,
		}
		if (file) {
			try {
				const fileName = Date.now() + file.name
				const uploadTask = storage.ref(`${currentUser?.username}/posts/${fileName}`).put(file);
				uploadTask.on("state_changed",
					snapshot => {
						const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						setProgress(progress);
					},
					error => { console.log(error); },
					async () => {
						await storage.ref(`${currentUser?.username}/posts/`).child(fileName).getDownloadURL().then((imgurl) => { newPost.img = imgurl })
						const res = await userRequest.post("/posts/" + currentUserId, newPost);
						setPosts([res.data, ...posts])
						setDesc("")
						setPreview(null);
						setProgress(0);
						setFile(null);
						setMakePost(true);
						setTimeout(() => {
							setMakePost(false);
						}, 1000);
					}
				)
			}
			catch (error) {
				console.log(error.message)
				// history.push("/error")
			}
		}
		else {
			try {
				const res = await userRequest.post("/posts/" + currentUserId, newPost);
				setPosts([res.data, ...posts])
				setPreview(null);
				setProgress(0);
				setFile(null);
				setMakePost(true);
				setDesc("")
				setTimeout(() => {
					setMakePost(false);
				}, 1000);
			} catch (error) {
				console.log(error.message)
				// history.push("/error")
			}
		}

	}


	const handleRemoveImg = () => {
		setFile(null);
		setPreview(null);
	}

	return (
		<div className="share">
			<div className="share-wrapper">
				<div className="share-top">
					<img src={currentUser?.profilePicture ? currentUser?.profilePicture : PF + "person/noAvatar.png"} alt="profileimg" />
					<input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={"What in Your Mind Today " + currentUser?.username + " ??"} />
				</div>
				<hr />
				{preview ?
					<div className="img-upload">
						<img src={preview} className="uploaded-img" alt="No images Selected" />
						<div className="remove-uploaded-img" onClick={handleRemoveImg}><Cancel /></div>
						<progress className="upload-progress" value={progress} />
						{progress === 100 ? <div className="upload-complete"> Image Upload completed</div> : ''}
					</div>
					:
					''
				}
				{makePost ? <div className="post-complete"> Post Successfully </div> : ''}
				<div className="share-bottom">

					<form onSubmit={handleSubmit} className="option-container">
						<label htmlFor="file" className="option">
							<PermMedia htmlColor="red" className="icon" />
							<span className="option-text">Photo & Video</span>
							<input type="file" name="file" accept="image/*" id="file" style={{ display: "none" }} onChange={handleFilechange} />
						</label>
						<label htmlFor="label" className="option">
							<Label htmlColor="blue" className="icon" />
							<span className="option-text" style={{ textDecorationLine: 'line-through' }} >Label</span>
							<input type="label" name="label" id="label" style={{ display: "none" }} onChange={(e) => { }} />
						</label>
						<label htmlFor="location" className="option">
							<Room htmlColor="green" className="icon" />
							<span className="option-text" style={{ textDecorationLine: 'line-through' }} >Location</span>
							<input type="location" name="location" id="location" style={{ display: "none" }} onChange={(e) => { }} />
						</label>
						<label htmlFor="feeling" className="option">
							<EmojiEmotions htmlColor="yellow" className="icon" />
							<span className="option-text" style={{ textDecorationLine: 'line-through' }}>Feeling</span>
							<input type="feeling" name="feeling" id="feeling" style={{ display: "none" }} onChange={(e) => { }} />
						</label>
						<button type="submit"> Share </button>
					</form>

				</div>
			</div>
		</div>
	)
}

export default Share
