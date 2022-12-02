import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";

export default function SearchItem() {
	const router = useRouter();
	const {pathname} = router;
    return (<Grid  container flex={1} justifyContent="center" alignItems="center">
    <Paper elevation={2} 
        sx={[{display: 'flex', py: 0.5, px: 1, borderRadius: 6, minWidth: '300px', alignItems: 'center'}, 
        {'&:hover': {boxShadow: 3}}]}>
        {pathname == '/' && <>
        <Button color="info"
            sx={{px:1.5, py: 0.5, lineHeight: 1.2, borderRadius:0,}}>어디든지</Button>
        <Button color="info"
            sx={{px:1.5, py: 0.5, lineHeight: 1.2, borderRadius:0, borderLeft: 1, borderRight: 1, borderColor: grey[300]}}>언제든 일주일</Button>
        <Button color="info"
            sx={{px:1.5, py: 0.5, lineHeight: 1.2, borderRadius:0,}}>게스트추가</Button>
        </>}
        {pathname == '/rooms/[roomId]' && 
            <Typography variant="body2" fontWeight={500}
                sx={{pl: 1.5, flex: 1}} >검색 시작하기</Typography> }
        <Box sx={{width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#ff385c', cursor: 'pointer'}}>
            <SearchIcon sx={{color: '#fff', fontSize: '16px'}} />
        </Box>
    </Paper>
</Grid>)
}