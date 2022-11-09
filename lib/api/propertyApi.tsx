import PropertyType from "../../interface/propertyType";

const serverURI = process.env.NEXT_PUBLIC_SERVER_URI

const postOption = {
    method: 'POST',
    headers: { 
        "Content-type": "application/json",
        "Accept": "application/json"
    },
}

export async function getPropertyGroupList() {
    let endPoint = serverURI + '/api/property/propertyGroup';
    const response = await fetch(endPoint);
    const data: PropertyType[] = await response.json();
    return data;
}