import React from 'react'
import Topbar from "../../component/Topbar/Topbar"
import "./chat.css"
import Conversation from "../../component/Conversation/Conversation"
import Message from "../../component/Message/Message"
import Online from "../../component/Online/Online"
import { Send, Refresh } from '@material-ui/icons';
import { Users } from "../../dummy-data"

function Chat() {
	return (
		<>
			<Topbar />
			<div className="messenger">
				<div className="messenger-wrapper">

					<div className="chat-left">
						<div className="chat-left-wrapper">
							<input type="text" className="search-friend" placeholder="Search friend for Chat" />
							<Conversation />
							<Conversation />
							<Conversation />
							<Conversation />
						</div>
					</div>
					<div className="chat-center">
						<div className="chat-center-wrapper">
							<div className="chat-center-top">

								<Message />
								<Message own={true} />
								<Message />
								<Message own={true} />
								<Message />
							</div>
							<div className="chat-center-bottom">
								<textarea name="" id="message" cols="30" rows="3" placeholder="Write something here ...."></textarea>
								<Refresh className="sending-process" />
								<Send className="send-btn" />
							</div>
						</div>
					</div>

					<div className="chat-right">
						<div className="chat-right-wrapper">
							<h2 className="heading">Online Friend</h2>
							<ul className="online-friend-list">
								{Users.map((user) => <Online key={user.id} user={user} />)}
							</ul>
						</div>
					</div>

				</div>
			</div>
		</>
	)
}

export default Chat
