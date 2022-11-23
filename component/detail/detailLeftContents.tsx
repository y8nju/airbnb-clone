import { Grid, Box, Typography, Avatar, Divider } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HostingType } from "../../interface/hostingType";
import { amenitiesGroup, AmenityType } from "../../lib/utils/amenitiesGroup";
import { useEffect, useState } from "react";

function DetailLeftContents({ data }: { data: HostingType }) {
  const [amenities, setAmenities] = useState<AmenityType[]| []>([]);
  useEffect(()=> {
    let arr: any[] = []
    if(data?.amenities !== undefined && data!.amenities!.length > 0) {
      data.amenities?.filter(amenity => {
        amenitiesGroup.map((one) => {
          if(one.title == amenity) {
            arr.push(one)
          }
        })
      })
    };
    setAmenities(arr);

  }, [])
  return (<>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid flex={1} sx={{ py: 3 }}>
          <Typography variant="h5" sx={{mb: 2}}>
            {data.hostname!.split("@")[0]} 님이 호스팅하는 {data.property}의&nbsp;
            {data.privacy}
          </Typography>
          <Typography variant="body1" fontWeight={300}>
            최대 인원 {data.floorPlan!.guests!} • 침대 {data.floorPlan!.beds!}개 •
            욕실 {data.floorPlan!.bathrooms!} 개
          </Typography>
        </Grid>
        <Avatar sx={{ bgcolor: "#ff2047" }}>
          <FavoriteBorderIcon />
        </Avatar>
      </Grid>
      <Divider />
      <Grid container sx={{ py: 3 }}>
        <Typography variant="h5" sx={{mb: 2}}>
          <span style={{ color: "#ff385c" }}>에어</span>커버
        </Typography>
        <Typography variant="body1">
          모든 예약에는 호스트가 예약을 취소하거나 숙소 정보가 정확하지 않은
          경우 또는 체크인에 문제가 있는 상황에 대비한 무료 보호 프로그램이
          포함됩니다.
        </Typography>
      </Grid>
      <Divider />
      <Grid container sx={{ py: 3 }}>
        <Typography variant="body1">
          {data.description!.description!}
        </Typography>
      </Grid>
      <Divider />
      {amenities && <>
        <Grid container sx={{ py: 3 }}>
          <Typography variant="h5" sx={{mb: 2}}>숙소 편의시설</Typography>
          <Grid container>
            {amenities.map((one, index) => {
                return <Grid item sm={6} xs={12}
                  alignItems="center"
                  sx={{display: 'flex', pb: 1, gap: '8px'}}>
                  {one.icon} {one.title}
                </Grid>
              })
            }
          </Grid>
        </Grid>
        <Divider />
      </>}
      <Grid container sx={{ py: 3 }}>
        <Typography variant="body1">
          {data.description!.description!}
        </Typography>
      </Grid>
      <Divider />
    </>
  );
}

export default DetailLeftContents;
