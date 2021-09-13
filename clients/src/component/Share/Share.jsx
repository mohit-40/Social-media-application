import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import "./Share.css"
import { storage } from "../../firebase/firebase";
import axios from "axios"
import { useHistory } from "react-router-dom";


function Share() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);
	const history = useHistory();
	const desc = useRef('');
	const [file, setFile] = useState({})
	const [progress, setProgress] = useState(0)
	const [url, setUrl] = useState('')

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
			"userId": currentUser._id,
			"desc": desc.current.value,
		}
		if (file) {
			try {
				const fileName = Date.now() + file.name
				const uploadTask = storage.ref(`${currentUser.username}/posts/${fileName}`).put(file);
				await uploadTask.on(
					"state_changed",
					snapshot => {
						const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						setProgress(progress);
					},
					error => { console.log(error); },
					async () => {
						await storage.ref(`${currentUser.username}/posts/`).child(fileName).getDownloadURL().then((imgurl )=> { setUrl(imgurl); newPost.img = imgurl})
						await axios.post("/posts", newPost);
						setMakePost(true);
						setTimeout(() => {
							setMakePost(false);
							setPreview(null);
							setProgress(0);
							setFile(null);
							window.location.reload();
						}, 2000);
					}
				)
			}
			catch (error) {
				console.log(error.message)
				history.push("/error")
			}
		}
		else{
			try {
				await axios.post("/posts", newPost);
				setMakePost(true);
				setTimeout(() => {
					setMakePost(false);
					setPreview(null);
					setProgress(0);
					setFile(null);
					window.location.reload();
				}, 2000);
			} catch (error) {
				console.log(error.message)
				history.push("/error")
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
					<img src={currentUser.profilePicture ? currentUser.profilePicture : PF + "person/noAvatar.png"} alt="profileimg" />
					<input type="text" ref={desc} placeholder={"What in Your Mind Today " + currentUser.username + " ??"} />
				</div>
				<hr />
				{preview ?
					<div className="img-upload">
						<img src={preview} className="uploaded-img" alt="No Image Selected" />
						<button className="remove-uploaded-img" onClick={handleRemoveImg}>Remove</button>
						<progress className="upload-progress" value={progress} />
						{progress === 100 ? <div className="upload-complete"> Image Upload completed</div> : ''}
					</div>
					:
					''
				}
				{makePost ? <div className="post-complete"> Post Successfully / reloading Now</div> : ''}
				<div className="share-bottom">

					<form onSubmit={handleSubmit} className="option-container">
						<label htmlFor="file" className="option">
							<PermMedia htmlColor="red" className="icon" />
							<span className="option-text">Photo & Video</span>
							<input type="file" name="file" accept="image/*" id="file" style={{ display: "none" }} onChange={handleFilechange} />
						</label>
						<label htmlFor="label" className="option">
							<Label htmlColor="blue" className="icon" />
							<span className="option-text">Label</span>
							<input type="label" name="label" id="label" style={{ display: "none" }} onChange={(e) => { }} />
						</label>
						<label htmlFor="location" className="option">
							<Room htmlColor="green" className="icon" />
							<span className="option-text">Location</span>
							<input type="location" name="location" id="location" style={{ display: "none" }} onChange={(e) => { }} />
						</label>
						<label htmlFor="feeling" className="option">
							<EmojiEmotions htmlColor="yellow" className="icon" />
							<span className="option-text">Feeling</span>
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
