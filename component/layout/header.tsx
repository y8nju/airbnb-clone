import {useState} from 'react'
import { Box, Button, Container, Divider, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignUpModal from '../modal/signUpModal';

export default function Header () {
	const [anchorElUser, setAnchorElUser] = useState<null | Element>(null);
	const [signupOpen, setSignupOpen] = useState<boolean>(false);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	
	return ( <Container maxWidth={false} disableGutters={true} sx={{ borderBottom: 1, borderBottomColor: 'grey.300' }}>
		<Container maxWidth="xl">
			<Toolbar>
				<img src="/images/logo.svg" alt="logo" width="102" height="32" />
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="center">
					서치 영역 들어옴
				</Typography>
				<Box sx={{ flexGrow: 0 }}>
					<Button variant="outlined" onClick={handleOpenUserMenu} color="inherit"
						sx={{ color: 'grey.700',  borderColor: 'grey.300', borderRadius: 50, pr: 0.8, pl: 1.4 }}>
						<MenuIcon fontSize='small' sx={{mr: 0.8}} />
						<AccountCircleIcon style={{ fontSize: '1.8rem'}}/>
					</Button>
					<Menu
						sx={{ mt: 6 }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem onClick={() => setSignupOpen(true)} sx={{pr: 8}}>
							<Typography style={{fontWeight: 600}}>회원가입</Typography>
						</MenuItem>
						<MenuItem onClick={handleCloseUserMenu} sx={{pr: 8}}>
							<Typography>로그인</Typography>
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleCloseUserMenu} sx={{pr: 8}}>
							<Typography>숙소 호스트 되기</Typography>
						</MenuItem>
						<MenuItem onClick={handleCloseUserMenu} sx={{pr: 8}}>
							<Typography>체험 호스팅 하기</Typography>
						</MenuItem>
						<MenuItem onClick={handleCloseUserMenu} sx={{pr: 8}}>
							<Typography>도움말</Typography>
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</Container>
		<SignUpModal open={Boolean(signupOpen)} onClose={setSignupOpen}/>
	</Container>)
}