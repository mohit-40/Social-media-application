import { Refresh } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import Conversation from "../../component/Conversation/Conversation"
import Message from "../../component/Message/Message"
import Online from "../../component/Online/Online"
import Topbar from "../../component/Topbar/Topbar"
import "./chat.css"
import { io } from "socket.io-client";
import {useSelector} from "react-redux"
import {userRequest} from "../../requestMethod"

function Chat() {  
	const userState = useSelector(state => state.user)
	const currentUser = userState.currentUser;
	
	const [conversations, setConversations] = useState([])
	const [currConversation, setCurrConversation] = useState(null)
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState()
	const scrollRef = useRef();
	const socket = useRef();
	const [onlineFriend, setOnlineFriend] = useState([]);
	const [dynamicMessage, setDynamicMessage] = useState();
	const [chatSearch, setChatSearch] = useState('')
	const [followings, setFollowings] = useState([])
	//fetch followings
	useEffect(() => {
		const fetchFollowings = async () => {
			const res = await userRequest.get("/users/followings/" + currentUser._id)
			setFollowings(res.data)
		}
		fetchFollowings()
	}, [currentUser]);

	//create the conversation
	async function handleClick(userId) {
		try {
			const res = await userRequest.post("/conversations/"+currentUser._id, { senderId: currentUser._id, receiverId: userId })
			setCurrConversation(res.data[0])

			!conversations.some((conversation)=> conversation._id===res.data[0]._id) && setConversations([...conversations,res.data[0]])
		} catch (error) {
			console.log(error)
		}
	}

	// connection to socket io
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (body) => {
			setDynamicMessage(body)
		})
	}, []);

	//updating the message after receiving
	useEffect(() => {
		dynamicMessage && currConversation?.members.includes(dynamicMessage.senderId) && setMessages((prev) => [...prev, dynamicMessage]);
	}, [dynamicMessage, currConversation]);
	
	//whenever new user connect add that user to socket server
	useEffect(() => {
		socket.current.emit("addUser", currentUser._id);
		socket.current.on("getUsers", (users) => {
			console.log("hello")
			setOnlineFriend(currentUser.followings.filter((f) => users.some((u) => u.userId === f)))
		})
	}, [currentUser]);
	
	
	// fetch conversation
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const res = await userRequest.get("/conversations/" + currentUser._id)
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
			try{
				if(currConversation) {
					const res = await userRequest.get("/messages/" + currConversation._id+"/"+currentUser._id);
					console.log(res.data);
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
			receiverId: currConversation.members.find((member) => member != currentUser._id),
		})
		try {
			const res = await userRequest.post("/messages/"+currentUser._id, body);
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
							<input type="text" className="search-friend" placeholder="Search friend for Chat" onChange={(e) => { setChatSearch(e.target.value) }} />

							{followings.filter((user) => chatSearch !== "" && user.name && user.name.toLowerCase().includes(chatSearch.toLowerCase())).slice(0,5).map((user) => {
								return (
									<div key={user?._id} onClick={() => handleClick(user._id)} className="search-result-item" >{user.name}</div>
								)
							})
							}



							{conversations?.map((conversation) => (
								<div key={conversation?._id} onClick={() => setCurrConversation(conversation) } >
									<div className={currConversation?._id===conversation?._id ? "selected" : ''}>
										<Conversation key={conversation?._id} conversation={conversation} />
									</div>
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
							<div className="no-chat-selected">Search friend and Select Conversation To Start the Chat</div>
						}
					</div>
					<div className="chat-right">
						<div className="chat-right-wrapper">
							<h2 className="heading">Online Friend</h2>
							<ul className="online-friend-list">
								{onlineFriend.length===0? "No friend Online" : ''}
								{onlineFriend?.map((userId) => (
									<Online key={userId} userId={userId} setCurrConversation={setCurrConversation} />
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
