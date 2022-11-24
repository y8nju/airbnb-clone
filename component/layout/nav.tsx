import { Breakpoint, Button, Container, Toolbar, Typography } from '@mui/material';
import CategoryMenu from '../menu/categoryMenu';
import TuneIcon from '@mui/icons-material/Tune';

interface Props {
	sx?: any,
	mw?: Breakpoint,
}

function ResponsiveAppBar(props: Props) {
	const filterHandle = (event: React.MouseEvent<HTMLElement>) => {

	};
	return (<Container maxWidth={props.mw} >
    <Toolbar>
		<CategoryMenu />
		
		<Button variant="outlined" onClick={filterHandle} color="inherit"
			sx={{ color: 'grey.700',  borderColor: 'grey.300', borderRadius: 2, px: 1.6, py: 1.2 }}>
			<TuneIcon sx={{fontSize: '1rem', mr: 0.8}} />
			<span style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap'}} >필터</span>
		</Button>
	</Toolbar>
	</Container>)
}
export default ResponsiveAppBar;
