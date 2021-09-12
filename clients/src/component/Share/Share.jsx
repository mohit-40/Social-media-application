import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import "./Share.css"
import { storage } from "../../firebase/firebase";

function Share() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);
	const desc = useRef('');
	const [file, setFile] = useState({})
	const [progress, setProgress] = useState(0)
	const [url, setUrl] = useState('')

	const [preview,setPreview] = useState('')


	const handleFilechange = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0])
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result) ;
			};
			reader.readAsDataURL(file);
		}
		else { 
			setFile(null)
		}


	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const uploadTask = storage.ref(`images/${file.name}`).put(file);
		uploadTask.on(
			"state_changed",
			snapshot => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			error => {
				console.log(error);
			},
			() => {
				storage
					.ref("images")
					.child(file.name)
					.getDownloadURL()
					.then(url => {
						setUrl(url);
					});
			}
		);
		console.log(file);
	};

	return (
		<div className="share">
			<div className="share-wrapper">
				<div className="share-top">
					<img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="profileimg" />
					<input type="text" ref={desc} placeholder={"What in Your Mind Today " + user.username + " ??"} />
				</div>
				<hr />
				<img src={preview} alt="No Image Selected" />
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
