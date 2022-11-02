import {useState} from 'react'
import { Avatar, Box, Container, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const accountSettings = ['회원가입', '로그인'];
const settings = ['숙소 호스트 되기', '체험 호스팅 하기', '도움말'];


export default function Header () {
    const [anchorElUser, setAnchorElUser] = useState<null | Element>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    
    return ( <Container maxWidth="xl"  sx={{ borderBottom: 1, borderBottomColor: '#ddd' }}>
    <Toolbar>
        <img src="/images/logo.svg" alt="logo" width="102" height="32" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="center">
            서치 영역 들어옴
        </Typography>

<Box sx={{ flexGrow: 0 }}>
    <Button  variant="outlined" onClick={handleOpenUserMenu}
    sx={{ color: 'gray',  borderColor: '#ddd', borderRadius: 50, pr: 0.5, pl: 1 }}>
      <MenuIcon fontSize='small' sx={{mr: 0.5}} />
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
    {accountSettings.map((setting) => (
      <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{pr: 8}}>
        <Typography textAlign="center">{setting}</Typography>
      </MenuItem>
    ))}
    <Divider />
    {settings.map((setting) => (
      <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{pr: 8}}>
        <Typography textAlign="center">{setting}</Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>
    </Toolbar>
    </Container>)
}