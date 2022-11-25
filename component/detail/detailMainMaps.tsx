
import { Box, Grid, Button, Typography, Avatar, Divider } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DetailLeftContents from "./detailLeftContents";
import DetailRightContents from "./detailRightContents";
import { HostingType } from "../../interface/hostingType";
import Maps from "./parts/maps";

function DetailMainMaps({ data }: { data: HostingType }) {
  return (
    <Grid container sx={{ py: 3 }}>
      <Typography variant="h5" sx={{mb: 2}}>호스팅 지역</Typography>
      <Box sx={{width: 1, height: '480px'}}>
        <Maps data={data} />
      </Box>
      <Box sx={{width: 1, mt: 2}}>
        <Typography variant="body1">
          {data.location!.street!.split(' ')[0]}, {data.location!.city!}, {data.location!.state!}
        </Typography>
      </Box>
    </Grid>
  );
}

export default DetailMainMaps;
