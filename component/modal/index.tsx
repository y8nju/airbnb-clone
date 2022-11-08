import React, { useState, Dispatch, SetStateAction } from 'react'
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';

interface Props {
	open: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactElement;
}

export default function BasicModal(props: Props) {
	return (<Modal
		open={props.open}
		onClose={() => props.onClose(false)}
		aria-labelledby="modal-modal-title"
		
		aria-describedby="modal-modal-description" >
		{props.children}
	</Modal> );
}
