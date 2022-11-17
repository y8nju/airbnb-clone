import { Grid, Typography } from "@mui/material";
import { createContext, useState } from "react";
import { useRouter } from "next/router";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import EmptyPhotoWrap from "../../../component/room/photos/emptyPhotoWrap";
import PreviewPhotoWrap from "../../../component/room/photos/PreviewPhotoWrap";

type tPhotosCtx = {
    files: File[];
    addFiles: (frag: File[]) => void;
    removeFiles: (t: File) => void;
}

export const PhotosContext = createContext<tPhotosCtx | null>(null);

export default function RoomPhotos () {
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();
	const {roomid} = router.query;
    
    const addFiles = (frag: File[]) => {
        setFiles((curr) => [...curr, ...frag]);
    }
    const removeFiles =(t: File) => {
        setFiles((curr) => {
            return curr.filter((one) => one !== t);
        })
    }

    const nextStepHandle = async () => {
        // console.log(router.query);
        // const updateData = {
        // 	_id: new Types.ObjectId(roomid as string),
        // 	floorPlan: {			}
        // }
        // const rst = await createAndUpdateListing(updateData);
        // console.log(rst)
        // if(rst.result) {
        // 	router.push('/become-a-host/'+roomid+'/amenities');
        // } else {
        // 	console.log('데이터가 정상적으로 등록되지 않았습니다');
        // }
    }
    return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader />
		<Grid container direction="column" spacing={2} 
			 alignItems="center"
			 sx={{px: 6, width: 1, mt: 0, ml: 0}}>
                <PhotosContext.Provider value={{files, addFiles,removeFiles}}>
                    {files.length == 0 && <EmptyPhotoWrap />}
                    {files.length !== 0 && <PreviewPhotoWrap />}
                </PhotosContext.Provider>
		</Grid>
		<HalfFooter progress={70} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomPhotos.layout = 'halfType'