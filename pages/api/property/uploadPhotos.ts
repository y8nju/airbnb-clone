import fs from 'fs';
import { NextApiRequest, NextApiResponse, NextConfig } from "next";
import formidable from "formidable";
import { firebaseApp } from "../../../lib/firebase-config";
import {ref, getStorage, getDownloadURL, uploadBytes} from 'firebase/storage';
import dbConnect from '../../../lib/dbConnect';


/* 
	mulripart / form-data parser는 기본 내장이 되어있지 않아 추가 설정
	(multer와 비슷)
	formidable: npm i formidable @types/formidable

	https://nextjs.org/docs/api-routes/request-helpers
*/

export const config: NextConfig = {
	api: {
		bodyParser: false,
	},
};
	
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
	) {
	await dbConnect();
	const form = formidable({ multiples: true });
	console.log("==== uploadPhotos ===");
	
	const result = await new Promise((resolve, reject) => {
		form.parse(req, async (err, fields, files) => {
			// resolve({
			// 	roomId: fields.roomid,
			// 	photos: files.photos as formidable.File[]
			// })
			if (err) {
				console.log("!! ERROR !!!", err);
				resolve({result: false, err: err})
			}
			const fileList: string[] = []
			if(Array.isArray(files.photos)) {
				// file이 multiple 일 때,
				const storage = getStorage(firebaseApp);
				const dirRef = ref(storage, `hosting/${fields.roomid}`);
				for(let file of files.photos as formidable.File[]) {
					const fileRef = ref(dirRef, file.newFilename);
					const photo = fs.readFileSync(file.filepath);
					const result = await uploadBytes(fileRef, photo, {contentType: file.mimetype!});
					//mimetype: fileType
					console.log(result);
					const url = await getDownloadURL(fileRef);
					console.log('url', url);
					fileList.push(url);
				}
				resolve({result: true, data: fileList})
			}else  {
				const storage = getStorage(firebaseApp);
				const dirRef = ref(storage, `hosting/${fields.roomid}`);
				const fileRef = ref(dirRef, files.photos.newFilename);
				const photo = fs.readFileSync(files.photos.filepath);
				const result = await uploadBytes(fileRef, photo, {contentType: files.photos.mimetype!});
				const url = await getDownloadURL(fileRef);
				console.log(url)
				resolve({result: true, data: [url]})
			}
		})
	});
	console.log(result)
	return res.status(200).json(result);

	// form.parse(req, async (err, fields, files) => {
	// 	
	// 	console.log(fields);
	// 	console.log(files);
		
	// 	const fileList: string[] = []
	// 	const storage = getStorage(firebaseApp);
	// 	const dirRef = ref(storage, `hosting/${fields.roomid}`);
	// 	for(let file of files.photos as formidable.File[]) {
	// 		const fileRef = ref(dirRef, file.newFilename);
	// 		const photo = fs.readFileSync(file.filepath);
	// 		console.log(photo);
	// 		const result = await uploadBytes(fileRef, photo, {contentType: file.mimetype!});
	// 		//mimetype: fileType
	// 		console.log(result);
	// 		const url = await getDownloadURL(fileRef);
	// 		console.log('url', url);
	// 		fileList.push(url);
	// 	}
	// 	return res.status(200).json({ data: fileList});
	// });
	
}