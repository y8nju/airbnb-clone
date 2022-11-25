import { Box, Typography, Button, IconButton } from "@mui/material";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

function StayHedaer() {
  const router = useRouter();
  return (
    <Grid container direction="column">
      <Grid item alignItems="center"
        sx={{ display: 'flex'}}>
          <Box sx={{pr: 3 }}>
            <IconButton size="small" color={"info"}  onClick={() => router.back()}>
              <ChevronLeftRoundedIcon />
            </IconButton>
          </Box>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={600}>
              예약 요청
            </Typography>
          </Box>
      </Grid>
    </Grid>
  );
}

export default StayHedaer;
