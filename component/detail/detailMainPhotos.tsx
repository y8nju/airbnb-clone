import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { HostingType } from "../../interface/hostingType";

function DetailMainPhotos({ data }: { data: HostingType }) {
  return (
    <Grid container sx={{mt: 2.5}}>
      <Grid
        container
        flexWrap="wrap"
        spacing={0.5} 
        sx={{ borderRadius: 5, overflow: "hidden", height: "512px" }}
      >
        <Grid item sm={6} xs={12} sx={{height: 'calc(100% + 4px)', mt: '-4px'}}>
          <img
            src={data.photos![0]}
            alt={"커버사진"}
            loading="lazy"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Grid>
        <Grid item sm={6} xs={12} container spacing={0.5} sx={{height: 'calc(100% + 8px)'}}>
          <Grid item xs={6} sx={{height: '50%', mt: '-4px'}}>
            <img
              src={data.photos![1]}
              alt={"커버사진"}
              loading="lazy"
              style={{ objectFit: "cover" }}
              width="100%"
              height={"100%"}
            />
          </Grid>
          <Grid item xs={6} sx={{height: '50%', mt: '-4px'}}>
            <img
              src={data.photos![2]}
              alt={"커버사진"}
              loading="lazy"
              style={{ objectFit: "cover" }}
              width="100%"
              height={"100%"}
            />
          </Grid>
          <Grid item xs={6} sx={{height: '50%'}}>
            <img
              src={data.photos![3]}
              alt={"커버사진"}
              loading="lazy"
              style={{ objectFit: "cover" }}
              width="100%"
              height={"100%"}
            />
          </Grid>
          <Grid item xs={6} sx={{height: '50%'}}>
            <img
              src={data.photos![4]}
              alt={"커버사진"}
              loading="lazy"
              style={{ objectFit: "cover" }}
              width="100%"
              height={"100%"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DetailMainPhotos;
