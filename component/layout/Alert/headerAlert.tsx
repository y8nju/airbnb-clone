import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { deepOrange, red } from "@mui/material/colors";
import { useCtx } from "../../../context/context";
import { Close, Error } from '@mui/icons-material/';

export default function HeaderAlert() {
    const ctx = useCtx();
    const {headerAlertProps, setHeaderAlertProps} = ctx!;
    const {type, title} = headerAlertProps;
    const closeHandle = () => {
        setHeaderAlertProps({
            type: null,
            title: null,
            visible: false
        })
    }
    return(<Box position="fixed" 
        sx={[{width: '100vw', top: '0', zIndex: 1200, color: 'text.primary', backgroundColor: 'white'}, 
            type == 'error' && {backgroundColor: deepOrange[100]}
        ]}>
        <Grid container sx={{py: 1 , px: 4}} alignItems='center'>
            <Grid item flexGrow={1} justifyContent="center" alignItems='center' sx={{display: 'flex'}}>
                {type== 'error' && <Error sx={{mr: 1, mt: 0.5, fontSize: '1.8rem', color: '#e4a593'}} />}
                <Typography variant="body2" sx={{fontWeight: 300}}>{title}</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={closeHandle}>
                    <Close fontSize="small" sx={ type == 'error' && {color: '#b2725f'}} />
                </IconButton>
            </Grid>
        </Grid>
    </Box>)
}