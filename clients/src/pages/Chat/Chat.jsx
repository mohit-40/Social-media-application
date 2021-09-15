import React, { useContext, useEffect, useState } from 'react'
import Topbar from "../../component/Topbar/Topbar"
import "./chat.css"
import Conversation from "../../component/Conversation/Conversation"
import Message from "../../component/Message/Message"
import Online from "../../component/Online/Online"
import { Send, Refresh } from '@material-ui/icons';
import { Users } from "../../dummy-data"
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext'


function Chat() {
	const { user: currentUser } = useContext(AuthContext)
	const [conversations, setConversations] = useState(null)
	const [currConversation, setCurrConversation] = useState(null)
	const [messages, setMessages] = useState()

	// fetch conversation
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const res = await axios.get("/conversations/" + currentUser._id)
				setConversations(res.data)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchConversations()
	}, [currentUser._id]);

	//fetch message
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await axios.get("/messages/" + currConversation._id)
				setMessages(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchMessages()
	}, [currConversation])

	// send message
	const handleSend=()=>{

	}


	return (

		<>
			<Topbar />
			<div className="messenger">
				<div className="messenger-wrapper">

					<div className="chat-left">
						<div className="chat-left-wrapper">
							<input type="text" className="search-friend" placeholder="Search friend for Chat" />
							{conversations?.map((conversation) => (
								<div onClick={() => setCurrConversation(conversation)}>
									<Conversation key={conversation._id} conversation={conversation} />
								</div>
							))}
						</div>
					</div>

					<div className="chat-center">

						{currConversation ?
							<div className="chat-center-wrapper">
								<div className="chat-center-top">
									{messages?.map((message) => <Message key={message._id} message={message} />)}

								</div>
								<div className="chat-center-bottom">
									<form className="box">
										<textarea name="" id="message" cols="30" rows="3" placeholder="Write something here ...." />
										<Refresh className="sending-process" />
										<button type="submit" className="send-btn" onClick={handleSend}>Send</button>
									</form>
								</div>
							</div>
							: 
							<div className="no-chat-selected">Select Conversation To Start the Chat</div>
						}
					</div>
					<div className="chat-right">
						<div className="chat-right-wrapper">
							<h2 className="heading">Online Friend</h2>
							<ul className="online-friend-list">
								{Users.map((user) => <Online key={user._id} user={user} />)}
							</ul>
						</div>
					</div>



				</div>
			</div>
		</>
	)
}

export default Chat
