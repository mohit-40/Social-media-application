import { Refresh } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import Conversation from "../../component/Conversation/Conversation"
import Message from "../../component/Message/Message"
import Online from "../../component/Online/Online"
import Topbar from "../../component/Topbar/Topbar"
import "./chat.css" 
import {useSelector} from "react-redux"
import {userRequest} from "../../requestMethod"
import { updateFollowing } from '../../redux/exportAllAction'
import { useDispatch } from 'react-redux'

function Chat() {  
	//fetching currentuser
	const socket=useSelector(state=>state.socket.socket);
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const [currentUser, setCurrentUser]= useState(null);
	useEffect(()=>{
		const fetchUser=async()=>{
			try {
				const res = await userRequest.get("/users?userId="+currentUserId); 
				setCurrentUser(res.data);
			} catch(error) {
				console.log(error);
			}
		}
		fetchUser();
	},[currentUserId,setCurrentUser])
	//fetched currentUser
	
	const [conversations, setConversations] = useState([])
	const [currConversation, setCurrConversation] = useState(null)
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState()
	const scrollRef = useRef(); 
	const [onlineFriend, setOnlineFriend] = useState([]);
	const [dynamicMessage, setDynamicMessage] = useState();
	const [chatSearch, setChatSearch] = useState('')
	const dispatch = useDispatch();
	const followings = useSelector(state => state.following.usersId)
	//fetch followings
	useEffect(() => {
		const fetchFollowings = async () => {
			const res = await userRequest.get("/users/followings/" + currentUserId)
			dispatch(updateFollowing(res.data))
		}
		fetchFollowings()
	}, [currentUserId,dispatch]);

	//create the conversation
	async function handleClick(userId) {
		try {
			const res = await userRequest.post("/conversations/"+currentUserId, { senderId: currentUserId, receiverId: userId })
			setCurrConversation(res.data[0])

			!conversations.some((conversation)=> conversation._id===res.data[0]._id) && setConversations([...conversations,res.data[0]])
		} catch (error) {
			console.log(error)
		}
	}

	// listen to socket event
	useEffect(() => { 
		socket?.on("getMessage", (body) => {
			setDynamicMessage(body)
		})
	}, [socket]);

	//updating the message after receiving
	useEffect(() => {
		dynamicMessage && currConversation?.members.includes(dynamicMessage.senderId) && setMessages((prev) => [...prev, dynamicMessage]);
	}, [dynamicMessage, currConversation]);
	
	//whenever new user connect add that user to socket server
	useEffect(() => { 
		currentUserId && socket?.emit("addUser",currentUserId);
		socket?.on("getUsers", (users) => { 
			setOnlineFriend(currentUser?.followings.filter((f) => users.some((u) => u.userId === f))) 
		})
	}, [currentUserId,currentUser,socket]);
	
	// fetch conversation
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const res = await userRequest.get("/conversations/" + currentUserId)
				setConversations(res.data)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchConversations()
	}, [currentUserId]);


	//fetch message
	useEffect(() => {
		const fetchMessages = async () => {
			try{
				if(currConversation) {
					const res = await userRequest.get("/messages/" + currConversation._id+"/"+currentUserId);
					console.log(res.data);
					setMessages(res.data)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchMessages()
	}, [currConversation, currentUserId])

	// send message
	const handleSend = async (e) => {
		e.preventDefault()
		const body = {
			conversationId: currConversation,
			senderId: currentUserId,
			textMessage: newMessage
		}
		try {
			const res = await userRequest.post("/messages/"+currentUserId, body);
			setMessages([...messages, res.data]);
			socket?.emit("sendMessage", {
				body: body,
				receiverId: currConversation?.members.find((member) => member != currentUserId),
			})
			socket?.emit("sendNotification",{
				receiverId: currConversation?.members.find((member) => member != currentUserId),
				senderId: currentUserId,
				text:"send you a message",
				type:"message"
			})
			setNewMessage("")
		} catch (error) {
			console.log(error)
		}
	}

	// fetching alluser for search 
	const [allUsers, setAllUsers] = useState([])
	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const res = await userRequest.get("/users/allUsers")
				setAllUsers(res.data); 
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllUsers()
	}, [ ])

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
							<i class="fas fa-search"> Search user here!!</i>
							<input type="text" className="search-friend" placeholder="Search friend for Chat" onChange={(e) => { setChatSearch(e.target.value) }} />

							{allUsers.filter((user) =>  followings.includes(user._id) && chatSearch !== "" && user.name && user.name.toLowerCase().includes(chatSearch.toLowerCase())).slice(0,5).map((user) => {
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
											<Message key={message._id} message={message} own={message.senderId === currentUserId ? true : false} />
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
							<h2 className="heading"><i class="fas fa-globe-americas"></i> Online Friend</h2>
							<ul className="online-friend-list">
								{onlineFriend?.length===0? "No friend Online" : ''}
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
