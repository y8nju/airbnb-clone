import { HostingData } from "../../lib/models/hosting";
import { Grid, Box, Typography, Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";

function StaySection({ data }: { data: HostingData }) {
  return (
    <>
      <Grid container direction="column" >
          <Grid item sx={{ py: 3 }}>
            <Typography variant="h5" sx={{mb: 2}} fontWeight={500}>예약정보</Typography>
            <Grid item justifyContent="space-between" sx={{display: 'flex'}}>
              <Grid item direction="column" sx={{display: 'flex'}}>
                <Typography variant="body1" fontWeight={500}>날짜</Typography>
                <Typography variant="body1" ></Typography>
              </Grid>
              <Grid item>
                <Button color="info"></Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </>
  );
}

export default StaySection;
