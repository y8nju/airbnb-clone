import {useState} from 'react'
import { Box, Breakpoint, Button, Container, Toolbar, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginAndSignUp from '../ui/modal/resister';
import AnchorUserMenu from '../menu/anchorUserMenu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { useSession } from 'next-auth/react';

interface Props {
	sx?: any,
	mw?: Breakpoint,
}
export default function Header (props: Props) {
	const [anchorElUser, setAnchorElUser] = useState<null | Element>(null);
	const [signupOpen, setSignupOpen] = useState<boolean>(false);
	const {status} = useSession();
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	
	return ( <Container maxWidth={false} disableGutters={true} sx={[{ borderBottom: 1, borderBottomColor: 'grey.300' }, props.sx]}>
		<Container maxWidth={props.mw}>
			<Toolbar>
				<img src="/images/logo.svg" alt="logo" width="102" height="32" />
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="center">
					서치 영역 들어옴
				</Typography>
				<Box sx={{ flexGrow: 0 }}>
					<Button variant="outlined" onClick={handleOpenUserMenu} color="inherit"
						sx={{ color: 'grey.700',  borderColor: 'grey.300', borderRadius: 50, pr: 0.8, pl: 1.4 }}>
						<MenuIcon fontSize='small' sx={{mr: 0.8}} />
						{status === 'unauthenticated' && 
							<AccountCircleIcon style={{ fontSize: '1.8rem'}}/>
						}
						{status == 'authenticated' &&
							<AccountCircleTwoToneIcon style={{ fontSize: '1.8rem'}} />
						}
					</Button>
					<AnchorUserMenu active={anchorElUser} closeMenu={handleCloseUserMenu} setSignupOpen={setSignupOpen} />
				</Box>
			</Toolbar>
		</Container>
		<LoginAndSignUp open={Boolean(signupOpen)} onClose={setSignupOpen} closeMenu={handleCloseUserMenu}/>
	</Container>)
}