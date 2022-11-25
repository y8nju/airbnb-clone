import { HostingData } from "../../lib/models/hosting";
import { Box, Grid, Button, Typography, Avatar, Divider } from "@mui/material";
import StaySection from "./staySection";
import StayAside from "./stayAside";

function StayMain({ data }: { data: HostingData }) {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StaySection data={data} />
        </Grid>
        <Grid item md={4} xs={12} position="relative">
          <StayAside data={data} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StayMain;
