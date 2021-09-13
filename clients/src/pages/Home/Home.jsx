import React from 'react'
import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import Rightbar from '../../component/Rightbar/Rightbar';

import "./Home.css"

function Home() {
	return (
		<>
			<Topbar />
			<div className="hero-container">
				<Sidebar />
				<Feed timeline={true} />
				<Rightbar />
			</div>
		</>
	)
}

export default Home