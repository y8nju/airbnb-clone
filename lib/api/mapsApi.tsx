import { CoordinateType, CoorsType } from "../../interface/mapsType";
const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;

let width: number = 1920;
let height: number = 980;

// if (typeof window === 'undefined') {
//     width = window.outerWidth as number;
//     height = window.outerHeight as number;
// }

export function createStaticMapUri(coordinate: CoorsType) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${coordinate.lat},${coordinate.lng}&zoom=14&size=${width/2}x${height}&key=${appKey}`
}
export async function nowLocationAddress(coordinate: CoorsType) {
    const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.lat},${coordinate.lng}&key=${appKey}`
    const response = await fetch(endPoint);
    const data = await response.json();
    console.log('data', data)
    let result;
    data.results.forEach(one => {
        one.types.forEach(type => {
            switch(type) {
                case "street_address": {
                    result = one
                    break;
                }
            }
        })
    })
    return result;
}