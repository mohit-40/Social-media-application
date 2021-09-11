import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import "./Share.css"


function Share() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);
	const desc=useRef();
	const [file,setFile] =useState({})


	return (
		<div className="share">
			<div className="share-wrapper">
				<div className="share-top">
					<img src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="profileimg" />
					<input type="text" placeholder={"What in Your Mind Today "+user.username +" ??"} />
				</div>
				<hr />
				<div className="share-bottom">
					<form className="option-container">
						<label htmlFor="file" className="option">
							<PermMedia  htmlColor="red" className="icon"/>
							<span className="option-text">Photo & Video</span>
							<input type="file" name="file" id="file" style={{display:"none"}}  onChange={(e)=>{setFile(e.target.files[0])}}/>
						</label>
						<label htmlfor="label" className="option">
							<Label htmlColor="blue" className="icon"/>
							<span className="option-text">Label</span>
							<input type="label" name="label" id="label" style={{display:"none"}}  onChange={(e)=>{}}/>
						</label>
						<div htmlfor="location" className="option">
							<Room htmlColor="green" className="icon"/>
							<span className="option-text">Location</span>
							<input type="location" name="location" id="location" style={{display:"none"}}  onChange={(e)=>{}}/>
						</div>
						<div className="option">
							<EmojiEmotions htmlColor="yellow" className="icon"/>
							<span className="option-text">Feeling</span>
							<input type="feeling" name="feeling" id="feeling" style={{display:"none"}}  onChange={(e)=>{}} />
						</div>
						<button type="submit"> Share </button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Share
