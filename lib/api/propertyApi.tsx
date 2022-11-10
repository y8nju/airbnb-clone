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