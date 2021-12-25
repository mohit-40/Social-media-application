import React, { useState }  from 'react'
import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import Rightbar from '../../component/Rightbar/Rightbar';
import "./Home.css"  

function Home() {
	
	const [showRightbar, setShowRightbar] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
			<Topbar />
			<div className="hero-container">
				<div>

					<i className="fas fa-caret-square-right caret-right" style={{fontSize:"25px"}} onClick={()=>setShowSidebar(!showSidebar)}></i> 
					{showSidebar && <Sidebar />}
				</div>
				<Feed timeline={true} />
				<div>
					<i className="fas fa-caret-square-right caret-right" style={{fontSize:"25px"}} onClick={()=>setShowRightbar(!showRightbar)}></i>
					{showRightbar && <Rightbar />}
				</div>
			</div>
		</>
	)
}
export default Home