import React, { useEffect } from 'react'
import { useState } from 'react';
import { userRequest } from '../../requestMethod';
import "./NotificationListItem.css"
function NotificationListItem({ n }) {
	const [user , setUser ] = useState(null);
	useEffect(()=>{
		const fetchUser =async()=>{
			try {
				const res = await userRequest.get("/users?userId=" + n.senderId)
				setUser(res.data);
			} catch(error) {
				console.log(error)
			}
		}
		fetchUser();
	},[])

	return (
		<div>
			<li className='notificationListItem'>
				<div className="notificationImgContainer">
					<img src={user?.profilePicture} alt="img" className='notificationImg' />
				</div>
				{user?.name} {n.type}
			</li>
		</div>
	)
}

export default NotificationListItem
