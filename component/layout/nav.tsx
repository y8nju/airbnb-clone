import {useState} from 'react'
import { Tab, Tabs, Toolbar } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/material/styles';

function ResponsiveAppBar() {
	const [value, setValue] = useState(0);
  
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	  setValue(newValue);
	};
	return (<Container maxWidth="xl" >
    <Toolbar>
	<Tabs
		value={value}
		onChange={handleChange}
		variant="scrollable"
		scrollButtons="auto"
		aria-label="scrollable auto tabs example"
		textColor="inherit"
		// indicatorColor="secondary"
		TabIndicatorProps={{
			style: {
			  backgroundColor: "red"
			}
		  }}
		  className={useStyles.tabs}
		>
		<Tab label="Item One" />
		<Tab label="Item Two" />
		<Tab label="Item Three" />
		<Tab label="Item Four" />
		<Tab label="Item Five" />
		<Tab label="Item Six" />
		<Tab label="Item Seven" />
		<Tab label="Item One" />
		<Tab label="Item Two" />
		</Tabs>
	</Toolbar>
	</Container>)
}

const useStyles = makeStyles({
	tabs: {
  
	  "& .MuiTabs-indicator": {
		backgroundColor: "orange",
		height: 3,
	  },
	  "& .MuiTab-root.Mui-selected": {
		color: 'red'
	  }
	}
  })
export default ResponsiveAppBar;
