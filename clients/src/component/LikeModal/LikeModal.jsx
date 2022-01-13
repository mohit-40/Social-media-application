import React from 'react'
import {  Modal ,Button } from 'react-bootstrap';
import "./LikeModel.css"
import LikeModalListItem from "../ListModalListItem/ListModalListItem"

function likeModal(props) {
	return (
	  <Modal
		{...props}
		size="sm"
		aria-labelledby="contained-modal-title-vcenter"
		centered
	  >
		<Modal.Header closeButton>
		  <Modal.Title id="contained-modal-title-vcenter">
			Like({props.likes.length})
		  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
		  <ul className="likeModalList">
		  	{
				props.likes.map((l)=>
					<LikeModalListItem userId={l} key={l}/>
				)
			}
		  </ul>
		</Modal.Body>
		<Modal.Footer>
		  <Button onClick={props.onHide}>Close</Button>
		</Modal.Footer>
	  </Modal>
	);
  }

export default likeModal
