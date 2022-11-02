import { useState } from 'react'
import { Tab, Tabs } from '@mui/material';
import { categoryList } from '../../lib/utils/categoryList';


export default function CategoryMenu() {
	const [value, setValue] = useState<number>(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	  setValue(newValue);
	};
    return (<Tabs
		value={value}
		onChange={handleChange}
		variant="scrollable"
		scrollButtons="auto"
		aria-label="scrollable auto tabs example"
		textColor="primary"
		indicatorColor="primary"
        sx={{ flexGrow: 1 }}
		>
        {categoryList.map((category) => (
            <Tab key={category.label} label={category.label} style={{minHeight: '64px'}}/>
        ))}
    </Tabs>)
}