import { Box, Button, DialogContent, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BasicDialog from ".";
import { red } from '@mui/material/colors';

interface Open {
	open: boolean;
	onClose: () => void
}
export default function SignpDialog (props: Open) {
    const {open, onClose} = props;
    return (<BasicDialog id="signupModal" onClose={onClose} open={open} title={'로그인 또는 회원 가입'}>
            <DialogContent dividers>
                <Typography variant="h6" color="text.primary"
                    style={{fontWeight: 600}}>
                    에어비앤비에 오신 것을 환영합니다.
                </Typography>
                <TextField fullWidth label="이메일" id="fullWidth" sx={{mt: 2}} />
                <Button variant="contained" disableElevation
                    sx={{ width: 1, my: 2, bgcolor: red[600], p:1.4}}>
                    계속
                </Button>
                <Box style={{textAlign: 'center', position: 'relative'}}>
                    <Divider style={{ width: '100%', position: 'absolute', top: '50%', zIndex: 0}} />
                    <span style={{ fontSize: '10px', backgroundColor: 'white', padding: '0 16px', position: 'relative', zIndex: 5}} >또는</span>
                </Box>
        </DialogContent>
    </BasicDialog>);
}