import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export interface DialogProps {
    id: string;
    title: string;
    children?: React.ReactNode;
    open: boolean;
	  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BasicDialog(props: DialogProps) {
    const { children, title, onClose, open, id } = props;
    
  return (
      <BootstrapDialog
        onClose={() => onClose(!open)}
        fullWidth={true}
        aria-labelledby={id}
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id={id} style={{textAlign: 'center', fontSize: '1rem',	fontWeight: 600,}}>
            {title}
            <IconButton
                aria-label="close"
                onClick={() => onClose(!open)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
              <CloseIcon />
          </IconButton>
    </DialogTitle>
                {children}
      </BootstrapDialog>
  );
}
