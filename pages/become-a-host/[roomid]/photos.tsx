import { Grid, Typography } from "@mui/material";
import { ChangeEventHandler, createContext, Dispatch, DragEventHandler, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import HalfFooter from "../../../component/layout/otherLayout/halfType/footer";
import HalfHeader from "../../../component/layout/otherLayout/halfType/header";
import RightInner from "../../../component/layout/otherLayout/halfType/rightInner";
import EmptyPhotoWrap from "../../../component/room/photos/emptyPhotoWrap";
import PreviewPhotoWrap from "../../../component/room/photos/PreviewPhotoWrap";
import { createAndUpdateListing, fileUpload } from "../../../lib/api/propertyApi";
import { Types } from "mongoose";
import { HalfLayoutContext } from "../../../component/layout/otherLayout/halfType/halfTypeLayout";
import Head from "next/head";

type tPhotosCtx = {
    files: File[];
    addFiles: (frag: File[]) => void;
    removeFiles: (t: File) => void;
    draged: boolean;
    setDraged: Dispatch<SetStateAction<boolean>>;
    ref: RefObject<HTMLInputElement>;
    dropHandle: DragEventHandler<Element>;
    fileSelectHandle: ChangeEventHandler<HTMLInputElement>;
    loaded: boolean;
    setLoaded: Dispatch<SetStateAction<boolean>>;
    savedImgUri: string[] | null;
    setSavedImgUri: Dispatch<SetStateAction<string[] | null>>;
}

export const PhotosContext = createContext<tPhotosCtx | null>(null);

export default function RoomPhotos () {
    const [files, setFiles] = useState<File[]>([]);
    const [draged, setDraged] = useState(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [savedImgUri, setSavedImgUri] = useState<string[] | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const layoutCtx = useContext(HalfLayoutContext);
    const {setNextBtnDisabled, nextBtnDisabled, roomStep, progressPer, savedData} = layoutCtx!;

    useEffect(() => {
		if(savedData) {
            if(savedData?.photos) {
                console.log('savedData.photos', savedData.photos)
                if(savedData?.photos.length > 0) {
                    setSavedImgUri(savedData.photos!);
                } else {
                    setSavedImgUri(null);
                }
            }
		}
	}, [savedData]);

    useEffect(() => {
        if(files) {
            if(files.length >= 5) {
                setNextBtnDisabled(false);
            }else {
                setNextBtnDisabled(true);
            }
        }
        if(savedImgUri !== null)  {
            console.log('savedImgUri.length', savedImgUri.length)
            if(savedImgUri.length >= 5) {
                setNextBtnDisabled(false);
            } else if(files.length > 0) {
                if(savedImgUri.length + files.length >= 5) {
                    setNextBtnDisabled(false);
                }
            } else {
                setNextBtnDisabled(true);
            }
        }
    }, [files, savedImgUri])

    const addFiles = (frag: File[]) => {
        setFiles((curr) => [...curr, ...frag]);
    }
    const removeFiles = (t: File) => {
        setFiles((current) => {
        return current.filter((one) => one !== t);
        });
    };
    const dropHandle: React.DragEventHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt.dataTransfer.files); 
        const fileArray = Array.from(evt.dataTransfer.files); // File[]
        addFiles(fileArray)
        setLoaded(true);
    }
    const fileSelectHandle:React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        console.log(evt.target.files);
        if(evt.target.files) {
            const fileArray = Array.from(evt.target.files!); // File[]
            addFiles(fileArray);
            setLoaded(true);
        }
    }

    const nextStepHandle = async () => {
        setNextBtnDisabled(true);
        const {roomid} = router.query;
        let response;
        if(files.length > 0) {
            const formData = new FormData()
            formData.append('roomid', roomid as string);
            files.forEach((file) => {
                formData.append('photos', file);
            })
            response = await fileUpload(formData);
            console.log('response', response);
        }
        let updateData: object;
        if(savedImgUri !== null) {
            if(response !== undefined) {
                updateData = {
                    _id: new Types.ObjectId(roomid as string),
                    photos: [ ...savedImgUri, ...response.data],
                    step: roomStep
                }
            } else {
                updateData = {
                    _id: new Types.ObjectId(roomid as string),
                    photos: [ ...savedImgUri],
                    step: roomStep
                }
            }
        } else {
            updateData = {
                _id: new Types.ObjectId(roomid as string),
                photos: response.data,
                step: roomStep
            }
        }
        const rst = await createAndUpdateListing(updateData);
        console.log(rst)
        if(rst.result) {
        	router.push('/become-a-host/'+roomid+'/title');
        } else {
        	console.log('데이터가 정상적으로 등록되지 않았습니다');
        }
    }
    const saveHandle = () =>{
		if(!nextBtnDisabled) {
			nextStepHandle;
		} else {
			return;
		}
	}
    return ( <RightInner footerShow={true} headerShow={true} >
		<><HalfHeader saveHandle={saveHandle} />
		<Grid container direction="column" spacing={2} 
			 alignItems="center"
			 sx={{px: 6, width: 1, mt: 0, ml: 0, animation: 'fadein 1s'}}>
                <Head>
                    <title>사진 추가 - 에어비앤비</title>
                </Head>
                <PhotosContext.Provider value={{files, addFiles, removeFiles, draged, setDraged, ref, dropHandle, fileSelectHandle, loaded, setLoaded, savedImgUri, setSavedImgUri }}>
                    {(files.length == 0 && !savedImgUri) && <EmptyPhotoWrap />}
                    {(files.length !== 0 || savedImgUri) && <PreviewPhotoWrap />}
                </PhotosContext.Provider>
		</Grid>
		<HalfFooter progress={progressPer(roomStep)} nextStepHandle={nextStepHandle} /></>
	</RightInner> )
}
RoomPhotos.layout = 'halfType'