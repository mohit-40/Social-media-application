import React from 'react'
import Topbar from "../../component/Topbar/Topbar"
import "./Error.css"
 

function Error({statusCode , message}) {
	message=message?message:"Some Error Occured";

	return (
		<>
		<Topbar />
		<div className="error-page">
			<div className="error-message">{statusCode} {message}</div>
		</div>
		</>
	)
}

export default Error
