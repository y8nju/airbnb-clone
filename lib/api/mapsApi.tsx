import axios from "axios";
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