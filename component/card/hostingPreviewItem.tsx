import { Card, CardMedia, Typography, CardContent, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HostingType } from "../../interface/hostingType";
import { useRouter } from "next/router";

function HostingPreviewItem({ hosting }: { hosting: HostingType }) {
  const router = useRouter();
  const clickHandle = () => {
    window.open("/rooms/" + hosting._id);
  };

  return (<Card onClick={clickHandle}
    sx={{ position: "relative", cursor: "pointer", boxShadow: 'none' }}>
  {hosting && <><CardMedia
    sx={{ borderRadius: "10px", position: "relative", p: 0.5 }}
    component={"img"}
    image={hosting.photos![0]}
    height={240}
  />
  <FavoriteIcon
    sx={{
      position: "absolute",
      top: 7,
      right: 7,
      color: "gray",
    }}
  />
  <CardContent sx={{p: 1}}> 
    <Typography variant="subtitle1" sx={{fontWeight: 500, lineHeight: 1  }}>
      {hosting.location!.street!.split(' ')[0]}, {hosting.location!.state!}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {formatDistance(new Date(hosting.updatedAt!), new Date(), {
        addSuffix: true,
        locale: ko,
      })}{" "}
      등록됨
    </Typography>
    <Box sx={{display: 'flex'}}>
      <Typography variant="body2" sx={{fontWeight: 500}}>{hosting.price}</Typography>
      <Typography variant="body2"> / 박</Typography>
    </Box>
  </CardContent></>}
</Card>);
}

export default HostingPreviewItem;
