import { Refresh } from '@material-ui/icons'
import axios from "axios"
import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from "../../component/Conversation/Conversation"
import Message from "../../component/Message/Message"
import Online from "../../component/Online/Online"
import Topbar from "../../component/Topbar/Topbar"
import { AuthContext } from '../../Context/AuthContext'
import "./chat.css"
import { io } from "socket.io-client";


function Chat() {
	const { user: currentUser } = useContext(AuthContext)
	const [conversations, setConversations] = useState(null)
	const [currConversation, setCurrConversation] = useState(null)
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState()
	const scrollRef = useRef()
	const socket = useRef();
	const [onlineFriend, setOnlineFriend] = useState([]);
	const [dynamicMessage, setDynamicMessage] = useState();

	// connection to socket io
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (body) => {
			setDynamicMessage(body)
		})
	}, []);

	useEffect(() => {
		dynamicMessage && currConversation?.members.includes(dynamicMessage.senderId) && setMessages((prev) => [...prev, dynamicMessage]);
	}, [dynamicMessage, currConversation]);

	useEffect(() => {
		socket.current.emit("addUser", currentUser._id);
		socket.current.on("getUsers", (users) => {
			setOnlineFriend(currentUser.followings.filter( (f)=> users.some((u)=> u.userId === f)))
		})
	}, [currentUser]);
	

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
				if (currConversation) {
					const res = await axios.get("/messages/" + currConversation._id)
					setMessages(res.data)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchMessages()
	}, [currConversation])

	// send message
	const handleSend = async (e) => {
		e.preventDefault()
		const body = {
			conversationId: currConversation,
			senderId: currentUser._id,
			textMessage: newMessage
		}
		socket.current.emit("sendMessage", {
			body: body,
			receiverId: currConversation.members.find((member) => member !== currentUser._id),
		})
		try {
			const res = await axios.post("/messages/", body);
			setMessages([...messages, res.data]);
			setNewMessage("")
		} catch (error) {
			console.log(error)
		}
	}

	//scroll automatically on new messages 
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);


	return (

		<>
			<Topbar />
			<div className="messenger">
				<div className="messenger-wrapper">

					<div className="chat-left">
						<div className="chat-left-wrapper">
							<input type="text" className="search-friend" placeholder="Search friend for Chat" />
							{conversations?.map((conversation) => (
								<div key={conversation._id} onClick={() => setCurrConversation(conversation)}>
									<Conversation key={conversation._id} conversation={conversation} />
								</div>
							))}
						</div>
					</div>

					<div className="chat-center">

						{currConversation ?
							<div className="chat-center-wrapper">
								<div className="chat-center-top">
									{messages?.map((message) => (
										<div ref={scrollRef}>
											<Message key={message._id} message={message} own={message.senderId === currentUser._id ? true : false} />
										</div>
									))}

								</div>
								<div className="chat-center-bottom">
									<form className="box" onSubmit={handleSend}>
										<textarea onChange={(e) => setNewMessage(e.target.value)} name="" id="message" cols="30" rows="3" placeholder="Write something here ...." value={newMessage} />
										<Refresh className="sending-process" />
										<button type="submit" className="send-btn">Send</button>
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
								{onlineFriend?.map((userId) =>(
										<Online key={userId} userId={userId} />
								))}
							</ul>
						</div>
					</div>



				</div>
			</div>
		</>
	)
}

export default Chat
