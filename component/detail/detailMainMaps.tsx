
import { Box, Grid, Button, Typography, Avatar, Divider } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DetailLeftContents from "./detailLeftContents";
import DetailRightContents from "./detailRightContents";
import { HostingType } from "../../interface/hostingType";
import Maps from "./maps";

function DetailMainMaps({ data }: { data: HostingType }) {
  return (
    <Grid container sx={{ py: 3 }}>
      <Typography variant="h5" sx={{mb: 2}}>숙소 편의시설</Typography>
      <Box sx={{width: 1, height: '480px'}}>
        <Maps data={data} />
      </Box>
    </Grid>
  );
}

export default DetailMainMaps;
