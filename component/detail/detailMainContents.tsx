
import { Box, Grid, Button, Typography, Avatar, Divider } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DetailLeftContents from "./detailLeftContents";
import DetailRightContents from "./detailRightContents";
import { HostingType } from "../../interface/hostingType";
import { ReservedPeriod } from "../../pages/rooms/[roomId]";

interface Props {
  data: HostingType,
  reserved: ReservedPeriod
}

function DetailMainContents({ data, reserved }: Props) {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <DetailLeftContents data={data} reserved={reserved} />
        </Grid>
        <Grid item md={4} xs={12} position="relative">
          <DetailRightContents data={data} reserved={reserved} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DetailMainContents;
