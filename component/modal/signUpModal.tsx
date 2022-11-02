import React, { Dispatch, SetStateAction } from 'react'
import CardTypeComponent from './cardTypeComponent';
import BasicModal from "./index";
interface Open {
    open: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SignUpModal(props: Open) {
    return (<BasicModal open={props.open} onClose={props.onClose}>
        <CardTypeComponent onClose={props.onClose} />
    </BasicModal>)
}