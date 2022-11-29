import BasicModal from '../ui/modal/index'
import { Button, Grid, Typography, Divider, IconButton } from "@mui/material";
import { HostingType } from '../../interface/hostingType';
import Maps from '../detail/parts/maps';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

interface Open {
	open: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
    data: HostingType
}
export default function MapsModal(props: Open) {


    return(<BasicModal open={props.open} onClose={props.onClose}>
        <Grid container justifyContent="center" alignItems="center" position="fixed" top="50%" left="50%"
            sx={{transform: 'translate(-50%, -50%)', maxHeight: '80%'}}>
            <Grid position="relative">
                <Button color="info" variant="contained" size="small"
                    onClick={() => props.onClose(false)}
                    sx={{position: 'absolute', top: 16, left: 16, zIndex: 500, minWidth: '32px', height: '32px', p:'4px', borderRadius: '50%',
                    animation: 'fadein 1s'}}>
                    <CloseIcon fontSize="small" />
                </Button>
                <Grid item width="800px" height="480px"
                    sx={{borderRadius: 4, overflow: 'hidden'}}>
                    <Maps data={props.data} />
                </Grid>
            </Grid>
        </Grid>
    </BasicModal>)
}