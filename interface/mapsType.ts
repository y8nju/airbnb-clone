export interface CoorsType {
    lat: number,
    lng: number
}
export interface CoordinateType extends CoorsType {
    imgUrl?: string
}
const appKey = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;
export const defaultCoords: CoordinateType = {
    lat: 37.566722855452475,
    lng: 126.97873435079522,
    imgUrl: `https://maps.googleapis.com/maps/api/staticmap?center=37.566722855452475,126.97873435079522&zoom=14&size=500x900&key=${appKey}`
}