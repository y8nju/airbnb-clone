
import { Box, Typography, Button, Grid } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HostingType } from "../../interface/hostingType";

function DetailMainHeader({ data }: { data: HostingType }) {
  return (
    <Grid container direction="column">
      <Typography variant="h4" fontWeight={600}>
        {data.title}
      </Typography>
      <Grid container justifyContent="space-between" alignItems="center"
        sx={{mt: 1}}>
        <Box>
          <Typography variant="body2">
            {data.location!.street!.split(' ')[0]}, {data.location!.city!}, {data.location!.state!}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Button variant="text" startIcon={<IosShareIcon />} color="info">
            공유하기
          </Button>
          <Button
            variant="text"
            startIcon={<FavoriteBorderIcon />}
            color="info"
          >
            저장
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DetailMainHeader;
