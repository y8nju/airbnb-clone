import axios from "axios";
import { CoordinateType, CoorsType } from "../../interface/mapsType";
const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;
export function createStaticMapUri(coordinate: CoorsType, width: number, height: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${coordinate.lat},${coordinate.lng}&zoom=14&size=${width/2}x${height}&key=${appKey}`
}