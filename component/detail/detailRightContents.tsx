import { Box, Typography, Divider } from "@mui/material";
import { Card, CardContent, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { HostingType } from "../../interface/hostingType";

function DetailRightContents({ data }: { data: HostingType }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: "0px",
        }}
      >
        <Card sx={{ minWidth: "320px", margin: "auto" }}>
          <CardContent>
            <Box>
              <Typography component={"span"} variant={"h6"}>
                ₩{data.price!.toLocaleString()}
              </Typography>
              <Typography component={"span"}>/박</Typography>
            </Box>
            <Box>
              <Typography component={"span"} variant={"h6"}>
                ₩{data.price!.toLocaleString()}
              </Typography>
              <Typography component={"span"}>/박</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default DetailRightContents;
