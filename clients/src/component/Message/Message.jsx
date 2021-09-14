import React from 'react'
import "./Message.css"

function Message({own}) {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="message-top">
				<img src="https://source.unsplash.com/random" alt="" className="message-img"/>
				<p className="message-text">this is a message Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet consequatur harum minus vel animi perferendis expedita fugit repudiandae sunt sapiente.</p>
			</div>
			<div className="message-bottom">
				  1 hour ago
			</div>
		</div>
	)
}

export default Message
