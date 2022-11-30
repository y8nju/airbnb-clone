import { HostingType } from "../../interface/hostingType";
import PropertyType from "../../interface/propertyType";

const serverURI = process.env.NEXT_PUBLIC_SERVER_URI

const postOption = {
    method: 'POST',
    headers: { 
        "Content-type": "application/json",
        "Accept": "application/json"
    },
}

export async function getPropertyGroupList(group?: string) {
    let endPoint = serverURI + '/api/property/propertyGroup';
    console.log('group', group)
    if(group) {
        endPoint += `?group=${group}`
    } 
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log(data);
    const propertyGroup = data.datas
    return propertyGroup;
}

export async function getHostingList(roomid?: string) {
    console.log('roomid', roomid)
    let endPoint = serverURI + '/api/property/hostingList';
    if(roomid) {
        endPoint += `?roomid=${roomid}`
    }
    const response = await fetch(endPoint);
    const data = await response.json();
    return data
}

export async function createAndUpdateListing(doc: HostingType) {
    let endPoint = serverURI + '/api/property/createAndUpdateListing'
    console.log(doc)
    const response = await fetch(endPoint, {
        ...postOption,
        body: JSON.stringify(doc)
    });
    const data = await response.json();
    return data;
}

export async function fileUpload(doc: FormData) {
    let endPoint = serverURI + '/api/property/uploadPhotos'
    const response = await fetch(endPoint, {
        method: 'POST',
        body: doc
    });
    const data = await response.json();
    return data;
}

export async function deletedList(roomid: string) {
    let endPoint = serverURI + '/api/property/deletedList'
    console.log('roomid', roomid)
    const response = await fetch(endPoint, {
        ...postOption,
        body: JSON.stringify({roomid: roomid})
    })
    const data = await response.json();
    return data;
}