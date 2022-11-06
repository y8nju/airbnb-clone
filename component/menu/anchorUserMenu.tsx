import { SetStateAction, useState } from "react";
import { useSession } from 'next-auth/react';
import { Divider, Menu, MenuItem, Typography } from "@mui/material";
import AnchorUnUser from "./anchor_unUser";
import AnchorUser from "./anchor_user";

interface Anchor {
    active: null | Element
    setSignupOpen: (value: SetStateAction<boolean>) => void
    closeMenu: () => void
}
export default function AnchorUserMenu(props: Anchor) {
    const {active, setSignupOpen, closeMenu} = props;
	const {data, status} = useSession();
    return (<Menu
        sx={{ mt: 6 }}
        id="menu-appbar"
        anchorEl={active}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        open={Boolean(active)}
        onClose={closeMenu}
        >
            {status === 'unauthenticated' && 
                <AnchorUnUser closeMenu={closeMenu} setSignupOpen={setSignupOpen} />
            }
            {status == 'authenticated' &&
                <AnchorUser closeMenu={closeMenu} setSignupOpen={setSignupOpen} />
            }
    </Menu>)
    
}