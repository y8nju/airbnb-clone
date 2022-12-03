import { useState } from 'react'
import { Tab, Tabs } from '@mui/material';
import { categoryList } from '../../lib/utils/categoryList';
import { amenitiesGroup } from '../../lib/utils/amenitiesGroup';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';


export default function CategoryMenu() {
	const [value, setValue] = useState<number>(0);
	const router = useRouter();
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	  setValue(newValue);
	};
    return (<Tabs
		value={value}
		onChange={handleChange}
		variant="scrollable"
		scrollButtons="auto"
		aria-label="scrollable auto tabs example"
		textColor="inherit"
		TabIndicatorProps={{style: {backgroundColor: grey[800]}}}
        sx={{ flexGrow: 1 }}
		>
        {amenitiesGroup.map((amenity) => (
            <Tab key={amenity.title as string} label={amenity.title} icon={amenity.icon} 
				onClick={() => router.push(`/?type=${amenity.title}`)}
				style={{minHeight: '64px'}}/>
        ))}
    </Tabs>)
}