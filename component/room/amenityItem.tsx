import { ToggleButton } from "@mui/material";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface Props {
    icon: JSX.Element,
    title: string
}

export default function AmenityItem (props: Props) {
    const {icon, title} = props
    
    return ( <ToggleButton value={title} aria-label={title} 
        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            width: 'calc((100% - (80px*2))/3)'}}
        style={{}}>
        {icon}
        {title}
  </ToggleButton> )
}