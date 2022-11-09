import { Box } from "@mui/system";
import { ChidrenProps } from "../../interface/propsType";

export default function NoLayout (props: ChidrenProps) {
    
    return ( <Box sx={{height: '100vh'}}>
        {props.children}
</Box> )
}